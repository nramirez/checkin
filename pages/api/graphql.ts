import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './typeDefs';
var faker = require('faker');
const { random, name } = faker;

const range = (size, callback) => Array.from({ length: size }, callback);

const resolvers = {
    Query: {
        organizations: (query, { cursor, first }) => {
            faker.seed(123)
            const organizations = range(first, () => ({
                id: random.uuid(),
                name: `${name.firstName()} ${name.lastName()}`,
                enabled: false
            })) as Organization[];

            const cursorIndex = !cursor
                ? 0
                : organizations.findIndex(o => o.id === cursor) + 1
            const sliceOfOrganizations = organizations.slice(cursorIndex, cursorIndex + first)

            return {
                edges: sliceOfOrganizations.map(o => ({
                    cursor: o.id,
                    node: { ...o }
                })),
                pageInfo: {
                    endCursor: sliceOfOrganizations[sliceOfOrganizations.length - 1].id,
                    hasNextPage: cursorIndex + first < organizations.length,
                },
            }
        },
    },
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: '/api/graphql' });