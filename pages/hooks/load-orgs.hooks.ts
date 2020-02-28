import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client/core/types';

const GET_ORGS = gql`
query getOrgs($cursor: ID) {
  getOrgs(first: 10, cursor: $cursor) {
    edges {
      node {
        id
        name
        enabled
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

export interface OrgsResult {
  data: Org[];
  hasNextPage?: boolean;
  loading: boolean;
  fetchMore?: () => Promise<ApolloQueryResult<any>>
}

const useLoadOrgs = (): OrgsResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(GET_ORGS);

  if (loading || !data || !data.orgs) return {
    loading,
    data: []
  };

  const loadMore = () => {
    return fetchMore({
      query: GET_ORGS,
      variables: {
        cursor: data.orgs.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.orgs.edges
        const pageInfo = fetchMoreResult.orgs.pageInfo
        console.log(previousResult)

        return newEdges.length
          ? {
            orgs: {
              __typename: previousResult.orgs.__typename,
              edges: [...previousResult.orgs.edges, ...newEdges],
              pageInfo,
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.orgs.edges.map(({ node }) => node),
    hasNextPage: data.orgs.pageInfo.hasNextPage,
    loading,
    fetchMore: loadMore
  }
}

export { 
  useLoadOrgs as useOrgs 
} ;