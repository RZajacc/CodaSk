'use client';
import {User, UserPhoto} from '@/types/custom_types';
import {BuildFetchUrl} from '@/utils/BuildFetchUrl';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import FormInput from '@/components/Ui/Inputs/FormInput';
import RadioButtonGroup from '@/components/Ui/Inputs/RadioButtonGroup';

function CompleteProfileForm() {
  const session = useSession();

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();
  const id = session!.data?.user?.name as string;
  console.log('id :>> ', id);
  ``;

  const cohortNames = [
    'Blue Ants',
    'Petrol Raccoons',
    'Salmon Pink Treehoppers',
    'Orange Pigs',
    'Coral Honey Badgers',
  ];

  const [userInfo, setuserInfo] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_photo: '',
    bio: '',
    location: {
      city: '',
      country: '',
    },
    course_type: '',
    // course_date: Date(),
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
  const [selectedFile, setSelectedFile] = useState<File | string>('');

  const router = useRouter();

  const getUserInfo = async () => {
    if (!id) {
      // console.log(' whatxws going on?:>>');
    }
    // await location.reload();

    const requestOptions = {
      method: 'GET',
    };
    try {
      const response = await fetch(
        `${FETCH_URL}/api/users/id/${id}`,
        requestOptions
      );
      if (response.ok) {
        const results = await response.json();
        // console.log('userInfo Results :>> ', results);

        const userData = results!.data[0];

        // console.log('USERDATA :>> ', userData);
        setuserInfo(userData);
      } else {
        console.log('Error when fetching your user data');
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || '');
  };

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('user_photo', selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    try {
      const response = await fetch(
        `${FETCH_URL}/api/users/imageupload`,
        requestOptions
      );
      const result = (await response.json()) as UserPhoto;
      // console.log('result single photo:>> ', result);

      // setuserInfo({...userInfo, user_photo: result.user_photo});
      setuserInfo((prevInfo) => {
        return {...prevInfo, user_photo: result.user_photo};
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleCompleteProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('_id', id!);
      urlencoded.append('first_name', userInfo.first_name);
      urlencoded.append('last_name', userInfo.last_name);
      urlencoded.append('user_photo', userInfo.user_photo);
      urlencoded.append('bio', userInfo.bio);
      urlencoded.append('country', userInfo.location.country);
      urlencoded.append('city', userInfo.location.city);
      urlencoded.append('course_type', userInfo.course_type);
      // urlencoded.append('course_date', userInfo.course_date as string);
      urlencoded.append('cohort_name', userInfo.cohort_name);
      urlencoded.append('user_permission', userInfo.user_permission);
      urlencoded.append('website', userInfo.website);
      urlencoded.append('github', userInfo.github);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          `${FETCH_URL}/api/users/completeProfile`,
          requestOptions
        );
        // console.log('response :>> ', response);
        if (response.ok) {
          const result = await response.json();
          // console.log('result from update :>> ', result);
          setuserInfo(result);
          router.push(`${FETCH_URL}/user/profile/${id}`);
        }
      } catch (error) {
        console.log('error in your /completeProfile route:>> ', error);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <div>
      {/*Image upload section */}
      <div className="mb-4 flex items-center">
        <div className="mr-5">
          <Image
            className="rounded-full pb-2"
            alt="user_photo"
            src={
              userInfo?.user_photo ||
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
            }
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleFileSubmit}>
            <label htmlFor="user_photo">
              <input onChange={handleFileInput} type="file" name="user_photo" />
            </label>
            <br />
            <button
              type="submit"
              className="mt-4 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
            >
              upload
            </button>
          </form>
        </div>
      </div>

      <form className="grid gap-5" onSubmit={handleCompleteProfile}>
        {/*First and last name section*/}
        <div className="grid gap-4 sm:flex sm:gap-4">
          <FormInput
            label={'First Name'}
            htmlFor={'firstName'}
            type={'text'}
            placeholder={'First name'}
          />
          <FormInput
            label={'Last Name'}
            htmlFor={'lastName'}
            type={'text'}
            placeholder={'Last name'}
          />
        </div>

        <FormInput
          label={'Bio'}
          htmlFor={'bio'}
          type={'textarea'}
          placeholder={'Write a short bio...'}
        />

        <div className="grid gap-4 sm:flex sm:gap-4">
          <FormInput
            label={'City'}
            htmlFor={'city'}
            type={'text'}
            placeholder={'city'}
          />
          <FormInput
            label={'Country'}
            htmlFor={'country'}
            type={'text'}
            placeholder={'Country'}
          />
        </div>

        <div className="grid gap-4 sm:flex sm:gap-4">
          <FormInput
            label={'Github'}
            htmlFor={'github'}
            type={'text'}
            placeholder={'Github'}
          />
          <FormInput
            label={'Website'}
            htmlFor={'website'}
            type={'text'}
            placeholder={'Website'}
          />
        </div>

        {/* SELECT FIELDS SECTION*/}
        <div className="my-2 flex justify-evenly">
          <div>
            <label
              className="mx-2 mb-1 font-medium text-[#6741D9]"
              htmlFor="user_permission"
            >
              You are a:
            </label>
            <RadioButtonGroup
              htmlFor={'student_type'}
              inputOptions={['Student', 'Graduate', 'Mentor']}
            />
          </div>

          <div>
            <span className="mx-2 mb-1 font-medium text-[#6741D9]">
              Enrolled to a course:
            </span>
            <RadioButtonGroup
              htmlFor={'course_type'}
              inputOptions={['Web Development', 'Data Science']}
            />
          </div>
        </div>

        <div className="mb-2 flex flex-row justify-center">
          <label
            className="mx-2 content-center font-medium text-[#6741D9]"
            htmlFor="cohort_name"
          >
            From the
          </label>
          <select
            className="rounded-2xl bg-[#EDE9E6] p-2 text-black shadow-custom"
            name="cohort_name"
            value={userInfo?.cohort_name || 'cohort_name'}
          >
            <option value={'cohort_name'}>Cohort name</option>
            {cohortNames.map((optionValue, index) => (
              <option key={index} value={optionValue}>
                {optionValue}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              router.back();
            }}
            type="button"
            className="mx-1 my-1 w-min rounded-xl bg-black p-3 py-[0.10rem] text-white"
          >
            cancel
          </button>
          <button
            type="submit"
            className="mx-1 my-1 w-min rounded-xl bg-black p-3 py-[0.10rem] text-white"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompleteProfileForm;
