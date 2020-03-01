import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { Member } from './types';

const LoadMembers = gql`
query LoadMembers($limit: Int!, $offset: Int!) {
  Members_aggregate(limit: $limit, offset: $offset) {
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

export interface PageInfo {
  limit: number;
  offset: number;
}

export interface UserResult {
  data: Member[];
  count: number;
  loading: boolean;
  fetchMore?: (info: PageInfo) => Promise<ApolloQueryResult<any>>
}

const useMembers = (initialInfo: PageInfo): UserResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(LoadMembers, {
    variables: {
      ...initialInfo
    }
  });

  if (loading || !data || !data.Members) return {
    loading,
    data: [],
    count: 0
  };

  const loadMore = (info: PageInfo) => {
    return fetchMore({
      query: LoadMembers,
      variables: {
        ...info
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.Members.edges;

        return newEdges.length
          ? {
            Members: {
              __typename: previousResult.Members.__typename,
              edges: [...previousResult.Members.edges, ...newEdges],
              aggregate: fetchMoreResult.aggregate.count
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.Members.edges.map(({ node }) => node),
    count: data.Members.aggregate.count,
    loading,
    fetchMore: loadMore
  }
}

export {
  useMembers
};