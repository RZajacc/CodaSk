'use client';
import {FaGithub, FaGoogle} from 'react-icons/fa';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React from 'react';
import FormInput from '@/components/Ui/Inputs/FormInput';
function LogInForm() {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        // console.error('Login failed:', result.error);
      } else {
        // router.push(`../user/moreinfo`);
        router.push(`/`);
        // location.reload();

        // console.log('Result of login successfully:', result);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="w-96 rounded-2xl bg-[#EDE9E6] p-10">
      <form
        onSubmit={handleLogin}
        data-testid="login-form"
        className="mb-4 grid gap-3"
      >
        <FormInput
          label={'Email'}
          htmlFor={'email'}
          type={'email'}
          placeholder={'email'}
          required={true}
        />
        <FormInput
          label={'Password'}
          htmlFor={'password'}
          type={'password'}
          placeholder={'password'}
          required={true}
        />

        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        >
          log in
        </button>
      </form>

      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    signIn('github', {*/}
      {/*      redirect: false,*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  className="rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black"*/}
      {/*>*/}
      {/*  <FaGithub style={{fontSize: '2em'}} />*/}
      {/*  log in with Github*/}
      {/*</button>*/}
    </div>
  );
}

export default LogInForm;
