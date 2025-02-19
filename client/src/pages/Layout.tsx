import React, {ReactElement, ReactNode} from 'react';
import CodaskNav from '@/components/Ui/MainNav';
import CodaskSidebar from '../components/Ui/Sidebar';
import Footer from '../components/Ui/Footer';
import {SessionProvider} from 'next-auth/react';

type Props = {
  children: ReactElement;
};

function Layout({children}: Props) {
  return (
    <>
      <SessionProvider>
        <CodaskNav />
        <CodaskSidebar />
        <main className="relative ml-48 border-l-2 border-r-gray-200">
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default Layout;
