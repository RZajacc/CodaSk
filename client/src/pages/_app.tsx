import '@/styles/globals.css';
import '@/styles/modal.css';
import '@/styles/loader.css';
import '@/styles/navbar.css';
import type {AppProps} from 'next/app';
import Layout from './Layout';
import {SessionProvider} from 'next-auth/react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

export default function App({Component, pageProps}: AppProps) {
  const {session} = pageProps;

  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
