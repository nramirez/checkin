import gql from 'graphql-tag';

export default gql`
    type Org {
        id: ID!
        name: String
        enabled: Boolean
    }

    input OrgInput {
        name: String!
        enabled: Boolean
    }

    type OrgPayload {
        org: Org
    }

    type OrgConnection {
        edges: [OrgEdge]
        pageInfo: PageInfo
    }

    type PageInfo {
        endCursor: ID!
        hasNextPage: Boolean!
    }

    type OrgEdge {
        cursor: ID!
        node: Org!
    }

    type Mutation {
        addOrg(org: OrgInput!): OrgPayload!
    }

    type Query {
        Orgs(first: Int!, cursor: ID): OrgConnection
    }
`;