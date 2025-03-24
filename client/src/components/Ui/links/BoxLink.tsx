import Link from 'next/link';
import React from 'react';

type Props = {
  url: string;
  children: React.ReactNode;
};

function BoxLink({url, children}: Props) {
  return (
    <Link
      className="md:40 h-40 w-4/5 content-center  rounded-lg bg-[#D9D9D9] p-5 text-center text-xl font-bold text-[#6741D9] no-underline shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2 sm:w-36"
      href={url}
    >
      {children}
    </Link>
  );
}

export default BoxLink;
