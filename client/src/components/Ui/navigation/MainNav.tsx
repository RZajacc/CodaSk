import {useSession} from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import SearchBox from './nav-elements/SearchBox';
import HamburgerButton from '../buttons/HamburgerButton';
import LinksAuthUser from './nav-elements/LinksAuthUser';
import LinksNoUser from './nav-elements/LinksNoUser';

function MainNav() {
  const {data: session, status, update} = useSession();

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] px-4 py-1 sm:h-24 md:h-28 md:px-6">
        {/* LEFT SECTION */}
        <HamburgerButton className="md:hidden" />
        <Link
          href={'/'}
          className="relative mx-1 hidden h-14 w-14 hover:font-semibold focus:font-semibold sm:h-16 sm:w-16 md:block md:h-20 md:w-20"
        >
          <Image className="mainLogo" src={'/CodaskLogo.png'} alt="Logo" fill />
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
