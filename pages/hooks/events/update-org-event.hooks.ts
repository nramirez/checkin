import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { OrgEventInput } from '../types';

const UPDATE_ORG_EVENTS = gql`
mutation UpdateOrgEvent($id: uuid!, $set: OrgEvents_set_input!) {
    update_OrgEvents(_set: $set, where: {id: {_eq: $id}}) {
      returning {
        id
        description
        details
        location
        startTime
        endTime
      }
    }
  }
`;

const useUpdateOrgEvent = () => {
  const [updateOrgEvents] = useMutation(UPDATE_ORG_EVENTS);
  const updateOrgEvent = (id: string, memberInput: OrgEventInput) => new Promise(
    (resolve, reject) => {
      // graphql responses include __typename by default
      // updating a instance would fail to deal with this one
      // if this is a bigger issue in the future we can just create a helper
      // https://github.com/apollographql/apollo-feature-requests/issues/6
      // in the meantime let's just remove it before updating
      delete memberInput['__typename'];

      updateOrgEvents({
        variables: {
          id: id,
          set: memberInput
        }
      }).then(({ data }) => resolve(data.update_OrgEvents.returning[0]))
        .catch(reject);
    });
  return [updateOrgEvent];
}

export { useUpdateOrgEvent };