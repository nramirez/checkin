import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client/core/types';

const GET_ORGANIZATIONS = gql`
query getOrganizations($cursor: ID) {
  organizations(first: 10, cursor: $cursor) {
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

export interface OrganizationsResult {
  data: Organization[];
  hasNextPage?: boolean;
  loading: boolean;
  fetchMore?: () => Promise<ApolloQueryResult<any>>
}

const useLoadOrgs = (): OrganizationsResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(GET_ORGANIZATIONS);

  if (loading || !data || !data.organizations) return {
    loading,
    data: []
  };

  const loadMore = () => {
    return fetchMore({
      query: GET_ORGANIZATIONS,
      variables: {
        cursor: data.organizations.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.organizations.edges
        const pageInfo = fetchMoreResult.organizations.pageInfo
        console.log(previousResult)

        return newEdges.length
          ? {
            organizations: {
              __typename: previousResult.organizations.__typename,
              edges: [...previousResult.organizations.edges, ...newEdges],
              pageInfo,
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.organizations.edges.map(({ node }) => node),
    hasNextPage: data.organizations.pageInfo.hasNextPage,
    loading,
    fetchMore: loadMore
  }
}

export { 
  useLoadOrgs as useOrgs 
} ;