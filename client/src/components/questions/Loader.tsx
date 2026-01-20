import Image from 'next/image';
import React from 'react';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="p-5 text-2xl text-red-600">
        Running on a free instance so a first query might take a while but then
        it's gonna run smooth!
      </h1>
      <Image
        className="loader"
        src={'/Loader.png'}
        alt="logo"
        width={400}
        height={400}
      />
    </div>
  );
}

export default Loader;
