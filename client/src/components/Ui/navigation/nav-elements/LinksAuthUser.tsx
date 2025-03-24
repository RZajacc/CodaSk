import Link from 'next/link';
import React from 'react';
import {BsPatchQuestion} from 'react-icons/bs';

type Props = {
  userId: string | undefined;
};

function LinksAuthUser({userId}: Props) {
  return (
    <>
      {' '}
      <li>
        <Link
          href={`/user/profile/${userId}`}
          className="mx-1 text-2xl text-white	 no-underline hover:font-semibold focus:font-semibold"
        >
          👀 |
        </Link>
      </li>
      {/* Later for notifications */}
      {/* <li className="mx-1 text-2xl text-white ">
    <FaRegEnvelope /> |{' '}
    </li> */}
      <li>
        {' '}
        <Link href={'/search/questions/askQuestion'}>
          <BsPatchQuestion style={{fontSize: '2rem', color: 'white'}} />
        </Link>
      </li>
    </>
  );
}

export default LinksAuthUser;
