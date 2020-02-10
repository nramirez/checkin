import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
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
        createOrganization(input: OrganizationInput!): OrganizationPayload!
    }

    type Query {
        organization(id: ID!): Organization
    }
`;

const apolloServer = new ApolloServer({
    typeDefs,
    mockEntireSchema: false
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: '/api/graphql' });