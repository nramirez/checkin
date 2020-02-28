import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_ORG = gql`
  mutation AddOrg($org: OrgInput!) {
    addOrg(org: $org) {
      name
      enabled
    }
  }
`;

export interface OrgInput {
    name: string;
    enabled: boolean;
}

export interface OrgPayload {
    org: Org;
}

const useAddOrg = () => {
    const [addOrg] = useMutation<OrgInput>(ADD_ORG);
    return [addOrg];
}

export { useAddOrg };