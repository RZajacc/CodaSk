import Link from 'next/link';
import React from 'react';

function LinksNoUser() {
  return (
    <>
      <li>
        <Link
          href={'/user/register'}
          className="mx-1 text-white no-underline hover:font-semibold focus:font-semibold"
        >
          Sign up
        </Link>
      </li>
      <li>
        <Link
          href={'/user/login'}
          className="mx-1 text-white no-underline hover:font-semibold focus:font-semibold"
        >
          | Log in
        </Link>
      </li>
    </>
  );
}

export default LinksNoUser;
