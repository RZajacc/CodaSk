import React from 'react';
import CompleteProfileForm from '@/components/forms/CompleteProfileForm';

import Image from 'next/image';

type Props = {};

export default async function MoreInfo({}: Props) {
  return (
    <div className="h-full bg-[#6741D9] p-4">
      <div className="my-2 flex items-center justify-center">
        <h1 className="text-center text-xl font-medium text-white md:text-3xl lg:text-4xl">
          Tell us more <br className="hidden md:block" /> about yourself...
        </h1>
        <Image
          className="hidden lg:block"
          width={340}
          height={340}
          alt="yellow-cloud"
          src={
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701698239/codask/website_photos/pngtree-orange-blob-elements-png-image_6578663_swgnu2.png'
          }
        />
      </div>

      <div className="mx-auto rounded-2xl bg-[#EDE9E6] p-6 sm:max-w-3xl">
        <CompleteProfileForm />
        <pre className="mt-4">
          <code className="text-center text-pink-600">Let's get to it!</code>
        </pre>{' '}
      </div>
    </div>
  );
}
