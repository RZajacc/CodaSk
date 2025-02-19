'use client';
import '@/styles/globals.css';
import '@/styles/modal.css';
import '@/styles/loader.css';
import '@/styles/navbar.css';
import {SessionProvider} from 'next-auth/react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import CodaskNav from '@/components/CodaskNav';
import CodaskSidebar from '@/components/CodaskSidebar';
import Footer from '@/components/Footer';

export default function RootLayout({children}: {children: React.ReactNode}) {
  const client = new ApolloClient({
    uri: 'http://localhost:5008/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ApolloProvider client={client}>
            {/* <CodaskNav /> */}
            <CodaskSidebar />
            <main className="relative ml-48 border-l-2 border-r-gray-200">
              {children}
            </main>
            <Footer />
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
