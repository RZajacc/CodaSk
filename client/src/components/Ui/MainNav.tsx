import {useSession} from 'next-auth/react';
import {BsPatchQuestion} from 'react-icons/bs';
import {FaRegEnvelope} from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import SearchBox from './SearchBox';
import HamburgerButton from './buttons/HamburgerButton';

function MainNav() {
  const {data: session, status, update} = useSession();

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 border-b-[#EDE9E6] bg-[#6741D9] px-4 py-1 sm:h-24 md:h-28 md:px-6">
        {/* LEFT SECTION */}
        <HamburgerButton className="md:hidden" />
        <Link
          href={'/'}
          className="relative mx-1 hidden h-14 w-14 hover:font-semibold focus:font-semibold sm:h-16 sm:w-16 md:block md:h-20 md:w-20"
        >
          <Image className="mainLogo" src={'/CodaskLogo.png'} alt="Logo" fill />
        </Link>

        {/* MIDDLE SECTION */}
        <div className="hidden w-5/12 md:block">
          <SearchBox />
        </div>

        {/* RIGHT SECTION */}
        <ul className="flex list-none ">
          {status === 'unauthenticated' ? (
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
          )}
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
