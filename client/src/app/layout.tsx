'use client';
import '@/styles/globals.css';
import '@/styles/modal.css';
import '@/styles/loader.css';
import {SessionProvider} from 'next-auth/react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MainNav from '@/components/Ui/navigation/MainNav';
import Sidebar from '@/components/Ui/Sidebar';
import Footer from '@/components/Ui/Footer';
import {BuildFetchUrl} from '@/utils/BuildFetchUrl';

export default function RootLayout({children}: {children: React.ReactNode}) {
  const FETCH_URL = BuildFetchUrl();

  const client = new ApolloClient({
    uri: `${FETCH_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <SessionProvider>
          <ApolloProvider client={client}>
            <MainNav />
            <Sidebar />
            <main className="h-full p-2">{children}</main>
            <Footer />
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
