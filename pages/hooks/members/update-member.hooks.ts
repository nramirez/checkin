import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { MemberInput } from '../types';

const UPDATE_MEMBER = gql`
mutation UpdateMember($id: uuid!, $set: Members_set_input!) {
    update_Members(_set: $set, where: {id: {_eq: $id}}) {
      returning {
        email
        id
        lastName
        name
        phoneNumber
      }
    }
  }
`;

const useUpdateMember = () => {
  const [updateMembers] = useMutation(UPDATE_MEMBER);
  const updateMember = (id: string, memberInput: MemberInput) => new Promise(
    (resolve, reject) => {
      // graphql responses include __typename by default
      // updating a instance would fail to deal with this one
      // if this is a bigger issue in the future we can just create a helper
      // https://github.com/apollographql/apollo-feature-requests/issues/6
      // in the meantime let's just remove it before updating
      delete memberInput['__typename'];

      updateMembers({
        variables: {
          id: id,
          set: memberInput
        }
      }).then(({ data }) => resolve(data.update_Members.returning[0]))
        .catch(reject);
    });
  return [updateMember];
}

export { useUpdateMember };