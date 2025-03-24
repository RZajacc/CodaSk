import React from 'react';

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};

function Backdrop({showMobileNav, setShowMobileNav}: Props) {
  const handleBackroInteraction = () => {
    setShowMobileNav((prev) => !prev);
  };
  return (
    <div
      id="backdrop"
      className={`h-lvh w-lvw animate-fadein fixed left-0 top-0 z-10 ${
        showMobileNav ? 'block' : 'hidden'
      } bg-slate-800`}
      onClick={handleBackroInteraction}
      onScroll={handleBackroInteraction}
    ></div>
  );
}

export default Backdrop;
