import {useSession} from 'next-auth/react';
import {BsPatchQuestion} from 'react-icons/bs';
import {FaRegEnvelope} from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import SearchBox from './SearchBox';
// import {C} from 'vitest/dist/chunks/reporters.DTtkbAtP.js';

function MainNav() {
  const {data: session, status, update} = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log('%c status', 'color:purple', status);
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status]);

  return (
    <>
      <nav className=" sticky top-0 z-50 flex max-h-28 items-center justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] p-6">
        {/* LEFT SECTION */}
        <Link
          href={'/'}
          className="mx-1 hover:font-semibold focus:font-semibold"
        >
          <Image
            className="mainLogo"
            src={'/CodaskLogo.png'}
            alt="Logo"
            width={110}
            height={110}
          />
        </Link>

        {/* MIDDLE SECTION */}
        <div className="w-5/12">
          <SearchBox />
        </div>

        {/* RIGHT SECTION */}
        <ul className="flex list-none ">
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  href={'/user/register'}
                  className="mx-1 no-underline hover:font-semibold focus:font-semibold"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  href={'/user/login'}
                  className="mx-1 no-underline hover:font-semibold focus:font-semibold"
                >
                  | Log in
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={`/user/profile/${session?.user?._id}`}
                  // href={`/user/profile/`}
                  className="mx-1 text-2xl text-white	 no-underline hover:font-semibold focus:font-semibold"
                >
                  👀 |{' '}
                </Link>
              </li>
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
          )}
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
