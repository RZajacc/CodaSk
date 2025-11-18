import BackButton from '@/components/Ui/buttons/BackButton';
import CompleteProfileForm from '@/components/forms/CompleteProfileForm';
import React from 'react';

type Props = {};

function UpdateProfile({}: Props) {
  return (
    <div>
      <div className="mt-10 grid justify-items-center">
        <div className=" mb-4 grid justify-items-center gap-2">
          <BackButton />
          <h1 className="lg:text-6x text-center font-medium text-[#6741D9] md:text-3xl">
            edit your profile
          </h1>
        </div>
        <div className="max-w-3xl rounded-2xl bg-[#EDE9E6] p-10">
          <CompleteProfileForm />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
