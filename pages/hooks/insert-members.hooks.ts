import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { MemberInput } from './types';

const INSERT_MEMBERS = gql`
mutation InsertMember(
  $objects: [Members_insert_input!]!
) {
  insert_Members(objects: $objects) {
    returning {
      id
      email
      lastName
      name
      phoneNumber
    }
  }
}
`;

const useInsertMember = () => {
  const [insertMembers] = useMutation(INSERT_MEMBERS);
  const insertMember = (memberInput: MemberInput) => new Promise(
    (resolve, reject) => {
      insertMembers({
        variables: {
          objects: [memberInput]
        }
      }).then(({ data }) => resolve(data.insert_Members.returning[0]))
        .catch(reject);
    });
  return [insertMember];
}

export { useInsertMember };