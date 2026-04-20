import React from 'react';
import CodaskLogo from '../../../../assets/CodaskLogo.png';
import SideBarLink from './SideBarLink';
import {Link} from 'react-router';

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
  setHideMobileNav,
}: Props) {
  const handleSideNavVisibility = () => {
    setShowMobileNav((prev) => !prev);
    setHideMobileNav(true);
  };
  // const pathname = usePathname();

  return (
    <div
      className={`h-full ${showMobileNav && 'animate-slidein'} ${
        hideMobileNav && 'animate-slideout'
      } fixed top-0 -left-1/2 z-20 w-1/2 bg-white`}
    >
      {/* Logo and contact section */}
      <section className="mt-12">
        <Link
          to={'/'}
          onClick={handleSideNavVisibility}
          className="hover:animate-pulse"
        >
          <img
            src={CodaskLogo}
            alt="logo"
            width={84}
            className="mainLogo mx-auto"
          />
        </Link>
      </section>

      {/* Navigation section */}
      <ul className="mt-10 list-none px-7 text-center">
        <h1 className="mb-3 text-xl font-bold">SEARCH BY:</h1>
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/search/questions"
          text="Questions"
        />
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/search/tags"
          text="Tags"
        />
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/search/modules"
          text="Modules"
        />
        <h1 className="mt-6 mb-3 text-xl font-bold">DISCOVER:</h1>
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/discover/studentprojects"
          text="Student Projects"
        />
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/discover/polls"
          text="Polls"
        />
        <SideBarLink
          handleSideNavVisibility={handleSideNavVisibility}
          url="/discover/discussions"
          text="Discussions"
        />

        <section className="mt-12">
          <SideBarLink
            handleSideNavVisibility={handleSideNavVisibility}
            url="/connect"
            text="CONNECT"
          />
          <SideBarLink
            handleSideNavVisibility={handleSideNavVisibility}
            url="/about"
            text="ABOUT"
          />
          <SideBarLink
            handleSideNavVisibility={handleSideNavVisibility}
            url="/contact"
            text="CONTACT"
          />
        </section>
      </ul>
    </div>
  );
}

export default MobileSidebar;
