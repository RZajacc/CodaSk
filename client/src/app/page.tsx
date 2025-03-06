import Image from 'next/image';
import Link from 'next/link';
import helloGif from '../../public/ezgif.com-video-to-gif.gif';

export default async function page() {
  return (
    <main className="h-full ">
      <div>
        <div className="my-5 grid justify-items-center">
          <Image
            className=" rounded-lg"
            width={900}
            height={900}
            alt="homepage-photo"
            src={helloGif}
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
                <Link
                  className="h-40 w-40 rounded-lg  bg-[#D9D9D9] p-5 text-center text-xl font-bold text-[#6741D9] no-underline shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                  href={'/search/questions'}
                >
                  Search by questions
                </Link>

                <Link
                  className="h-40 w-40 rounded-lg  bg-[#D9D9D9] p-5 text-center text-xl font-bold text-[#6741D9] no-underline shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                  href={'/search/tags'}
                >
                  Search by tags
                </Link>

                <Link
                  className="h-40 w-40 rounded-lg  bg-[#D9D9D9] p-5 text-center text-xl font-bold text-[#6741D9] no-underline shadow-custom hover:bg-[#6741D9] hover:text-white hover:shadow-custom2"
                  href={'/search/modules'}
                >
                  Search by modules
                </Link>
              </div>
            </div>
          </div>

          <Image
            className="mainLogo my-3 items-center"
            src={'/CodaskLogo.png'}
            alt="Logo"
            width={210}
            height={210}
          />

          <pre>
            <code className=" text-[#E91E63]">
              Happy learning and happy coding!
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
