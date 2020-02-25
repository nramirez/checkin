import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './typeDefs';
var faker = require('faker');
const { random, name } = faker;

const range = (size, callback) => Array.from({ length: size }, callback);
const Max_Organizations = 200;

const resolvers = {
    Query: {
        organizations: (query, { cursor, first }) => {
            faker.seed(Date.now)
            const organizations = range(first, () => ({
                id: random.uuid(),
                name: `${name.firstName()} ${name.lastName()}`,
                enabled: false
            })) as Organization[];

            console.log(organizations)

            const cursorIndex = !cursor ? 0 : cursor + 1
            const sliceOfOrganizations = organizations.slice(cursorIndex, cursorIndex + first)

            console.log(sliceOfOrganizations)
            return {
                edges: sliceOfOrganizations.map(o => ({
                    cursor: o.id,
                    node: { ...o }
                })),
                pageInfo: {
                    endCursor: sliceOfOrganizations[sliceOfOrganizations.length - 1].id,
                    hasNextPage: cursorIndex + first < Max_Organizations,
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