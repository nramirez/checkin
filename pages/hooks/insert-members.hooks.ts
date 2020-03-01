import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Member, UserInput } from './types';

const INSERT_USER = gql`
mutation InsertUser(
  $objects: [Members_insert_input!]!,
  $on_conflict: Members_on_conflict
) {
  insert_Members(objects: $objects, on_conflict: $on_conflict) {
    returning {
      id
      email
      lastName
      name
      phone
    }
  }
}
`;

export interface InsertUserPayload {
  org: Member;
}

const useInsertUser = () => {
  const [insertMembers] = useMutation(INSERT_USER);
  const insertUser = (memberInput: UserInput) =>
    insertMembers({
      variables: {
        $objects: [memberInput]
      }
    })
  return [insertUser];
}

export { useInsertUser };