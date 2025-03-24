import Image from 'next/image';
import helloGif from '../../public/ezgif.com-video-to-gif.gif';
import CodaskLogo from '../../public/CodaskLogo.png';
import BoxLink from '@/components/Ui/links/BoxLink';

export default async function page() {
  return (
    <div className="my-5 grid justify-items-center">
      {/* Main image for the page */}
      <Image
        className=" w-full rounded-lg md:w-4/5 lg:w-2/3"
        alt="homepage-gif"
        src={helloGif}
        data-testid="main-gif"
      />

      {/* Header text section */}
      <h1 className="m-1 pb-8 pt-6 text-center text-xl font-bold text-[#6741D9] md:text-3xl lg:text-4xl">
        Welcome to Codask,
        <br />a learning platform and community <br />
        for Codac students and alumnis!
      </h1>

      {/* Navigation box */}
      <div className="w-full justify-center">
        <div className="rounded-lg bg-[#B197FC] p-10 pb-10">
          <h2 className="mb-4 text-center text-3xl font-semibold dark:text-white">
            Stuck on a problem? Let us help...
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-8">
            <BoxLink url="/search/questions">Search by questions</BoxLink>
            <BoxLink url="/search/tags"> Search by tags</BoxLink>
            <BoxLink url="/search/modules">Search by modules</BoxLink>
          </div>
        </div>
      </div>

      {/* Logi image and text */}
      <Image
        className="my-3 w-1/3 md:w-1/6"
        src={CodaskLogo}
        alt="Codask Logo"
        data-testid="codask-logo"
      />

      <pre>
        <code className="break-words text-[#E91E63]">
          Happy learning and happy coding!
        </code>
      </pre>
    </div>
  );
}
