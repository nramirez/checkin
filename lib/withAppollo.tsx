import withApollo from 'next-with-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';


export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      link: createHttpLink({ uri: '/api/graphql' })
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);