import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './typeDefs';

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