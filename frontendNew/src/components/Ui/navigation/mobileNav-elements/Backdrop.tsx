import React from 'react';

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  setHideMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};

function Backdrop({showMobileNav, setShowMobileNav, setHideMobileNav}: Props) {
  const handleBackroInteraction = () => {
    setShowMobileNav((prev) => !prev);
    setHideMobileNav(true);
  };
  return (
    <div
      id="backdrop"
      className={`h-lvh w-lvw fixed left-0 top-0 z-10 animate-fadein ${
        showMobileNav ? 'block' : 'hidden'
      } bg-slate-800`}
      onClick={handleBackroInteraction}
      onScroll={handleBackroInteraction}
    ></div>
  );
}

export default Backdrop;
