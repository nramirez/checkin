import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { OrgEventInput } from '../types';

const INSERT_ORG_EVENTS = gql`
mutation InsertOrgEvent(
  $objects: [OrgEvents_insert_input!]!
) {
  insert_OrgEvents(objects: $objects) {
    returning {
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

const useInsertOrgEvent = () => {
  const [insertOrgEvents] = useMutation(INSERT_ORG_EVENTS);
  const insertOrgEvent = (input: OrgEventInput) => new Promise(
    (resolve, reject) => {
      insertOrgEvents({
        variables: {
          objects: [input]
        }
      }).then(({ data }) => resolve(data.insert_OrgEvents.returning[0]))
        .catch(reject);
    });
  return [insertOrgEvent];
}

export { useInsertOrgEvent };