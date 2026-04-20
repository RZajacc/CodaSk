import HamburgerButton from '../buttons/HamburgerButton';
import LinksAuthUser from './desktopNav-elements/LinksAuthUser';
import LinksNoUser from './desktopNav-elements/LinksNoUser';
import {useState} from 'react';
import Backdrop from './mobileNav-elements/Backdrop';
import MobileSidebar from './mobileNav-elements/MobileSidebar';
import CodaskLogo from '../../../assets/CodaskLogo.png';
import {Link} from 'react-router';

function MainNav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hideMobileNav, setHideMobileNav] = useState(false);

  const status = '';

  return (
    <>
      {/* -----MOBILE NAVIGATION ELEMENTS----- */}
      <Backdrop
        setShowMobileNav={setShowMobileNav}
        setHideMobileNav={setHideMobileNav}
        showMobileNav={showMobileNav}
      />
      <MobileSidebar
        setShowMobileNav={setShowMobileNav}
        setHideMobileNav={setHideMobileNav}
        hideMobileNav={hideMobileNav}
        showMobileNav={showMobileNav}
      />

      {/* -----DESKTOP NAVIGATION ELEMENTS----- */}
      <nav className="fixed top-0 left-0 flex h-20 w-full items-center justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] px-4 py-1 sm:h-24 md:h-28 md:px-6">
        {/* LEFT SECTION */}
        <HamburgerButton
          className="md:hidden"
          setShowMobileNav={setShowMobileNav}
          setHideMobileNav={setHideMobileNav}
        />
        <Link
          to={'/'}
          className="relative mx-1 hidden h-14 w-14 hover:font-semibold focus:font-semibold sm:h-16 sm:w-16 md:block md:h-20 md:w-20"
        >
          <img className="mainLogo" src={CodaskLogo} alt="Logo" />
        </Link>

        {/* RIGHT SECTION */}
        <ul className="flex list-none">
          {status ? <LinksAuthUser userId={'12'} /> : <LinksNoUser />}
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
