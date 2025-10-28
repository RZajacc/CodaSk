import React from 'react';
import SignUpForm from '@/components/forms/SignUpForm';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

export default async function Register({}: Props) {
  return (
    <div className="h-full bg-[#6741D9]">
      <h1 className="p-4 text-center text-xl font-medium text-white md:text-3xl">
        Please sign up:
      </h1>
      <div className="grid justify-center">
        <div className="relative z-20">
          <Image
            className="absolute -right-24 -top-20 -z-10 hidden sm:block"
            width={200}
            height={200}
            alt="green-cloud"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701533894/codask/website_photos/pngtree-element-green-blob-png-image_6578665_zxdtvn.png'
            }
          />
          <SignUpForm />
          <p className="m-4 text-center font-medium text-white">
            <Link href={'/user/login'}>Already have an account? log in!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
