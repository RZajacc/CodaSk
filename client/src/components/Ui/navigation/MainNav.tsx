import {useSession} from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import SearchBox from './desktopNav-elements/SearchBox';
import HamburgerButton from '../buttons/HamburgerButton';
import LinksAuthUser from './desktopNav-elements/LinksAuthUser';
import LinksNoUser from './desktopNav-elements/LinksNoUser';
import {useState} from 'react';
import Backdrop from './mobileNav-elements/Backdrop';
import MobileSidebar from './mobileNav-elements/MobileSidebar';
import CodaskLogo from '@/../public/CodaskLogo.png';

function MainNav() {
  const {data: session, status} = useSession();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hideMobileNav, setHideMobileNav] = useState(false);

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
      <nav className="fixed left-0 top-0 flex h-20 w-full items-center justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] px-4 py-1 sm:h-24 md:h-28 md:px-6">
        {/* LEFT SECTION */}
        <HamburgerButton
          className="md:hidden"
          setShowMobileNav={setShowMobileNav}
          setHideMobileNav={setHideMobileNav}
        />
        <Link
          href={'/'}
          className="relative mx-1 hidden h-14 w-14 hover:font-semibold focus:font-semibold sm:h-16 sm:w-16 md:block md:h-20 md:w-20"
        >
          <Image className="mainLogo" src={CodaskLogo} alt="Logo" fill />
        </Link>

        {/* MIDDLE SECTION */}
        <SearchBox />

        {/* RIGHT SECTION */}
        <ul className="flex list-none ">
          {status === 'authenticated' ? (
            <LinksAuthUser userId={session?.user?._id} />
          ) : (
            <LinksNoUser />
          )}
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
