import React from 'react';
import {Link} from 'react-router';

type Props = {
  url: string;
  children: React.ReactNode;
};

function BoxLink({url, children}: Props) {
  return (
    <Link
      className="md:40 shadow-custom hover:shadow-custom2 h-40 w-4/5 content-center rounded-lg bg-[#D9D9D9] p-5 text-center text-xl font-bold text-[#6741D9] no-underline hover:bg-[#6741D9] hover:text-white sm:w-36"
      to={url}
    >
      {children}
    </Link>
  );
}

export default BoxLink;
