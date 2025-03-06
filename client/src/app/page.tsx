import Image from 'next/image';
import helloGif from '../../public/ezgif.com-video-to-gif.gif';
import BoxLink from '@/components/Ui/links/BoxLink';

export default async function page() {
  return (
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
            <BoxLink url="/search/questions">Search by questions</BoxLink>
            <BoxLink url="/search/tags"> Search by tags</BoxLink>
            <BoxLink url="/search/modules">Search by modules</BoxLink>
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
  );
}
