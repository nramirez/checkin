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
      phoneNumber
    }
  }
}
`;

export interface PageInfo {
  limit: number;
  offset: number;
}

export interface MemberResult {
  data: Member[];
  count: number;
  loading: boolean;
  fetchMore?: (info: PageInfo) => Promise<ApolloQueryResult<any>>
}

const useMembers = (initialInfo: PageInfo): MemberResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(LoadMembers, {
    variables: {
      ...initialInfo
    }
  });

  if (!data) return {
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
        const newNodes = fetchMoreResult.Members.nodes;

        return newNodes.length
          ? {
            Members: {
              __typename: previousResult.__typename,
              nodes: [...previousResult.Members_aggregate.nodes, ...newNodes],
              aggregate: fetchMoreResult.Members_aggregate.aggregate.count
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.Members_aggregate.nodes.map(node => node),
    count: data.Members_aggregate.aggregate.count,
    loading,
    fetchMore: loadMore
  }
}

export {
  useMembers
};