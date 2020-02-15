import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client/core/types';

const GET_ORGANIZATIONS = gql`
query getOrganizations($cursor: ID) {
  organizations(first: 20, cursor: $cursor) {
    edges {
      node {
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
  organizations: Organization[];
  hasNextPage?: boolean;
  loading: boolean;
  loadMore?: () => Promise<ApolloQueryResult<any>>
}

const useOrganizations = (): OrganizationsResult => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(GET_ORGANIZATIONS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data.organizations) return {
    loading,
    organizations: []
  };

  const loadMore = () => {
    return fetchMore({
      query: GET_ORGANIZATIONS,
      //notifyOnNetworkStatusChange: true,
      variables: {
        cursor: data.organizations.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.organizations.edges
        const pageInfo = fetchMoreResult.organizations.pageInfo

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
    organizations: data.organizations.edges.map(({ node }) => node),
    hasNextPage: data.organizations.pageInfo.hasNextPage,
    loading,
    loadMore,
  }
}

export default useOrganizations;