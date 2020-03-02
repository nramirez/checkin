import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { PageInfo, PagingResult, OrgEvent } from '../types';

const LOAD_ORG_EVENTS = gql`
query LoadOrgEvents($limit: Int!, $offset: Int!) {
  OrgEvents_aggregate(limit: $limit, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      id
      description
      description
      location
      startTime
      endTime
    }
  }
}
`;

const useOrgEvents = (initialInfo: PageInfo): PagingResult<OrgEvent> => {
  const {
    data,
    loading,
    fetchMore,
  } = useQuery(LOAD_ORG_EVENTS, {
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
      query: LOAD_ORG_EVENTS,
      variables: {
        ...info
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newNodes = fetchMoreResult.OrgEvents.nodes;

        return newNodes.length
          ? {
            OrgEvents: {
              __typename: previousResult.__typename,
              nodes: [...previousResult.OrgEvents_aggregate.nodes, ...newNodes],
              aggregate: fetchMoreResult.OrgEvents_aggregate.aggregate.count
            },
          }
          : previousResult
      },
    })
  }

  return {
    data: data.OrgEvents_aggregate.nodes.map(node => node),
    count: data.OrgEvents_aggregate.aggregate.count,
    loading,
    fetchMore: loadMore
  }
}

export {
  useOrgEvents
};