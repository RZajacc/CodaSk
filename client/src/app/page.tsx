import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default async function page({}: Props) {
  return (
    <main className="h-full ">
      <div>
        <br />
        <div className="grid justify-items-center">
          <i className="fa fa-github"></i>
          <Image
            className=" rounded-lg"
            width={900}
            height={900}
            alt="homepage-photo"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1702067424/codask/website_photos/ezgif.com-video-to-gif_efni18.gif'
            }
          />
          <h1 className="lg:text-6x m-1 pb-8 pt-6 text-center font-bold text-[#6741D9] md:text-3xl">
            Welcome to Codask,
            <br />a learning platform and community <br />
            for Codac students and alumnis!
          </h1>

          <div className="flex min-w-full flex-col justify-center">
            <div
              id="purpleCTAcontainer"
              className="rounded-lg bg-[#B197FC] p-10 pb-10"
            >
              <h2 className="mb-4 text-center text-3xl font-semibold dark:text-white">
                Stuck on a problem? Let us help...
              </h2>
              <div className="flex flex-row justify-around">
                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 text-[#6741D9] shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                >
                  <Link
                    className="text-center text-xl font-bold  no-underline"
                    href={'/search/questions'}
                  >
                    Search by questions
                  </Link>
                </div>
                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 text-[#6741D9] shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                >
                  <Link
                    className="text-center text-xl font-bold no-underline"
                    href={'/search/tags'}
                  >
                    Search by tags
                  </Link>
                </div>

                <div
                  id="greyCTABox"
                  className="h-40 w-40 rounded-lg bg-[#D9D9D9] p-5 text-[#6741D9] shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                >
                  <Link
                    className="text-center text-xl font-bold  no-underline"
                    href={'/search/modules'}
                  >
                    {' '}
                    Search by modules
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br />
          <Image
            className="mainLogo items-center"
            src={'/CodaskLogo.png'}
            alt="Logo"
            width={210}
            height={210}
          />
          <br />
          <pre>
            <code className="text-[#E91E63]">
              Happy learning and happy coding!
            </code>
          </pre>
          <p></p>
          <br />
          <br />
        </div>
      </div>
    </main>
  );
}
