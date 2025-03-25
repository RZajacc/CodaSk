import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

type Props = {
  handleSideNavVisibility: () => void;
  url: string;
  text: string;
};

function SideBarLink({handleSideNavVisibility, url, text}: Props) {
  // Get the current pathname
  const pathname = usePathname();
  return (
    <li className="border-b-2 py-2 hover:bg-slate-100">
      <Link
        href={url}
        onClick={handleSideNavVisibility}
        className={` no-underline ${
          pathname === url
            ? 'text-lg font-bold hover:animate-pulse hover:cursor-default'
            : 'hover:animate-pulse hover:text-[#6741D9]'
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

export default SideBarLink;
