import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogInForm from '@/components/forms/LogInForm';

export default async function Login() {
  return (
    <div className="h-full bg-[#6741D9]">
      <h1 className="p-4 text-center text-xl font-medium text-white md:text-3xl">
        Please log in:
      </h1>
      <div className="grid justify-center">
        <div className="relative z-20">
          <Image
            className="absolute -bottom-12 -right-36 -z-10 hidden sm:block"
            width={200}
            height={200}
            alt="green-cloud"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701535913/codask/website_photos/pngtree-element-abstract-yellow-pastel-blob-png-image_6568008_l2qiel.png'
            }
          />
          <LogInForm />
          <p className="m-4 text-center font-medium text-white">
            <Link href={'/user/register'}>
              Don't have an account yet? sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
