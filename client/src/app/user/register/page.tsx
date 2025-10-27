import React from 'react';
import SignUpForm from '@/components/forms/SignUpForm';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

export default async function Register({}: Props) {
  return (
    <div className="bg-[#6741D9] relative h-full">
      <Image
        className="absolute right-0 top-0 z-10 hidden sm:block"
        width={200}
        height={200}
        alt="green-cloud"
        src={
          'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701533894/codask/website_photos/pngtree-element-green-blob-png-image_6578665_zxdtvn.png'
        }
      />
      <div className=" grid justify-center z-20 relative">
        <h1 className="mt-4 text-center font-medium text-white md:text-3xl">
          please sign up
        </h1>
        <div>
          <SignUpForm />
          <p className="text-center font-medium text-white">
            <Link href={'/user/login'}>Already have an account? log in!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
