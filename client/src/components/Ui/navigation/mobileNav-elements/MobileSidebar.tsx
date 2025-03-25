import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  showMobileNav: boolean;
  hideMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  setHideMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileSidebar({
  showMobileNav,
  hideMobileNav,
  setShowMobileNav,
}: Props) {
  return (
    <div
      id="sidenav"
      className={`h-full ${showMobileNav && 'animate-slidein'} ${
        hideMobileNav && 'animate-slideout'
      }  fixed -left-1/2 top-0 z-20 w-1/2 bg-white`}
    >
      {/* Logo and contact section */}
      <section className="mt-5">
        <h1 className="text-center text-2xl font-bold italic">Codask</h1>
        <Link
          href={'/'}
          // onClick={handleSideNavVisibility}
          className="hover:animate-pulse"
        >
          {/* <Image src={logo} alt="logo" width={42} className="mx-auto" /> */}
        </Link>
        {/* <div className="mt-5 flex justify-center space-x-5">
      <a
        href="https://github.com/RZajacc"
        target="_blank"
        // onClick={handleSideNavVisibility}
        className="hover:animate-pulse"
      >
        <FontAwesomeIcon icon={faGithub} size="2xl" />
      </a>
      <a
        href="https://www.linkedin.com/in/rafalzajac88/"
        target="_blank"
        onClick={handleSideNavVisibility}
        className="hover:animate-pulse"
      >
        <FontAwesomeIcon icon={faLinkedinIn} size="2xl" color="#0a66c2" />
      </a>
      <a
        href="mailto:rf.zajac@tutamail.com"
        onClick={handleSideNavVisibility}
        className="hover:animate-pulse"
      >
        <FontAwesomeIcon icon={faEnvelopeOpen} size="2xl" color="orange" />
      </a>
    </div> */}
      </section>

      {/* Navigation section */}
      <ul className="mt-10 space-y-2 px-7 text-center">
        <li className="border-b-2 ">
          <Link
            href={'/'}
            // onClick={handleSideNavVisibility}
            // className={`link ${pathname === '/' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Home
          </Link>
        </li>
        <li className="border-b-2">
          <Link
            href={'/locations'}
            // onClick={handleSideNavVisibility}
            // className={`link ${pathname === '/locations' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Locations
          </Link>
        </li>
        <li className="border-b-2">
          <Link
            href={'/contact'}
            // onClick={handleSideNavVisibility}
            // className={`link ${pathname === '/contact' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Contact
          </Link>
        </li>
        {/* {user ? (
      <>
        <li className="border-b-2  ">
          <Link
            href={'/account'}
            onClick={handleSideNavVisibility}
            className={`link ${pathname === '/account' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Account
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleSideNavVisibility();
              logout();
            }}
            className="rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:border-2 hover:border-black hover:bg-white hover:text-red-600"
          >
            Logout
          </button>
        </li>
      </>
    ) : (
      <>
        <li className="border-b-2  ">
          <Link
            href={'/register'}
            onClick={handleSideNavVisibility}
            className={`link ${pathname === '/register' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Register
          </Link>
        </li>
        <li className="border-b-2  ">
          <Link
            href={'/login'}
            onClick={handleSideNavVisibility}
            className={`link ${pathname === '/login' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
          >
            Login
          </Link>
        </li>
      </>
    )} */}
      </ul>
    </div>
  );
}

export default MobileSidebar;
