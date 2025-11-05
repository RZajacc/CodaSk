import React from 'react';
import CompleteProfileForm from '@/components/forms/CompleteProfileForm';

import Image from 'next/image';

type Props = {};

export default async function MoreInfo({}: Props) {
  return (
    <div className=" grid h-full justify-center bg-[#6741D9]">
      <div className="flex items-center justify-center">
        <h1 className="lg:text-6x text-center font-medium text-white md:text-3xl">
          tell us more <br /> about yourself...
        </h1>
        <Image
          width={340}
          height={340}
          alt="yellow-cloud"
          src={
            'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701698239/codask/website_photos/pngtree-orange-blob-elements-png-image_6578663_swgnu2.png'
          }
        />
      </div>
      <div className="m-2 mb-6 rounded-2xl bg-[#EDE9E6] p-6">
        <CompleteProfileForm />
        <pre className="mt-4">
          <code className="text-center text-pink-600">Let's get to it!</code>
        </pre>{' '}
      </div>
    </div>
  );
}
