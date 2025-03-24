import React from 'react';

type Props = {
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function HamburgerButton({setShowMobileNav, ...props}: Props) {
  return (
    <button {...props}>
      <svg
        viewBox="0 0 24 24"
        width="36"
        height="36"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="mx-5 cursor-pointer"
        onClick={() => {
          setShowMobileNav((prev) => !prev);
        }}
      >
        <line x1="2" y1="4.2" x2="24" y2="4.2" />
        <line x1="2" y1="9.4" x2="20" y2="9.4" />
        <line x1="2" y1="14.6" x2="22" y2="14.6" />
        <line x1="2" y1="19.8" x2="18" y2="19.8" />
      </svg>
    </button>
  );
}

export default HamburgerButton;
