import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client/core/types';

const LoadUsers = gql`
query LoadUsers($limit: Int!, $offset: Int!) {
  Users_aggregate(limit: $limit, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      email
      id
      lastName
      name
      phone
    }
  }
}
`;

export default interface User {
  id: string;
  email: string;
  lastName: string;
  name: string;
  phone: string;
}

export interface PageInfo {
  limit: number;
  offset: number;
}

export interface UserResult {
  data: User[];
  hasNextPage?: boolean;
  loading: boolean;
  fetchMore?: (info: PageInfo) => Promise<ApolloQueryResult<any>>
}

const useUsers = (initialInfo: PageInfo): UserResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(LoadUsers, {
    variables: {
      ...initialInfo
    }
  });

  if (loading || !data || !data.Users) return {
    loading,
    data: []
  };

  const loadMore = (info: PageInfo) => {
    return fetchMore({
      query: LoadUsers,
      variables: {
        ...info
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.Users.edges

        return newEdges.length
          ? {
            Users: {
              __typename: previousResult.Users.__typename,
              edges: [...previousResult.Users.edges, ...newEdges]
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.Users.edges.map(({ node }) => node),
    hasNextPage: data.Users.pageInfo.hasNextPage,
    loading,
    fetchMore: loadMore
  }
}

export {
  useUsers
};