import MainNav from '../components/Ui/navigation/MainNav.tsx';
import Sidebar from '../components/Ui/navigation/Sidebar.tsx';
import Footer from '../components/Ui/navigation/Footer.tsx';
import {Outlet} from 'react-router';

export default function RootLayout() {
  return (
    <div className="app">
      <header>
        <MainNav />
      </header>

      <Sidebar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
