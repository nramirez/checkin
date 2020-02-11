import gql from 'graphql-tag';

export default gql`
    type Organization {
        id: ID!
        name: String
        enabled: Boolean
    }

    input OrganizationInput {
        name: String!
        enabled: Boolean
    }

    type OrganizationPayload {
        organization: Organization
    }

    type Mutation {
        addOrganization(input: OrganizationInput!): OrganizationPayload!
    }

    type Query {
        organizations: [Organization]
    }
`;