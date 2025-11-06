'use client';
import {FaGithub} from 'react-icons/fa';
import {User} from '@/types/custom_types';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {FormEvent, useEffect, useState} from 'react';
import {BuildFetchUrl} from '@/utils/BuildFetchUrl';
import FormInput from '@/components/Ui/Inputs/FormInput';

function SignUpForm() {
  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  const [newUser, setNewUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_photo:
      'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png',
    bio: '',
    location: {
      city: '',
      country: '',
    },
    course_type: '',
    course_date: Date(),
    cohort_name: '',
    user_permission: '',
    website: '',
    github: '',
    member_since: new Date(),
    last_seen: Date(),
    questions: [],
    answers: [],
    saved_tags: [],
  });

  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Get the form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email && password) {
      if (!email.includes('@') && password.length < 6) {
        alert(
          'Your email seems to be invalid. \n Your password should be at least 6 characters'
        );
        return;
      } else if (password.length < 6) {
        alert('Your password should be at least 6 characters');
        return;
      } else if (!email.includes('@')) {
        alert('Your email seems to be invalid');
        return;
      }

      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();

        urlencoded.append('email', newUser.email);
        urlencoded.append('password', newUser.password);
        urlencoded.append('user_photo', newUser.user_photo);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
        };

        try {
          const response = await fetch(
            `${FETCH_URL}/api/users/signup`,
            requestOptions
          );
          if (response.ok) {
            const result = await response.json();
            // console.log('result in register:>> ', result);

            setNewUser(result);
            alert('Thank you for signing up!  🤓');
            await signIn('credentials', {
              ...newUser,
              redirect: false,
            });
          }
          router.push('/user/moreinfo');
          // location.reload();
        } catch (error) {
          console.log('error in your /signup fetch:>> ', error);
        }
      } catch (error) {
        console.log('error when adding new user:>> ', error);
      }
    }
  };

  useEffect(() => {
    setNewUser(newUser);
  }, []);

  return (
    <div className="w-96 rounded-2xl bg-[#EDE9E6] p-10">
      <form onSubmit={handleRegister} className="mb-4 grid gap-3">
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
          sign up
        </button>
      </form>

      <button
        onClick={() => {
          signIn('github', {
            redirect: false,
          });
        }}
        className="w-max rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black"
      >
        <FaGithub style={{fontSize: '2em'}} />
        sign up with Github
      </button>
    </div>
  );
}

export default SignUpForm;
