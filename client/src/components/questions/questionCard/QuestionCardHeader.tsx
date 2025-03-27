import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';
import Image from 'next/image';
import React from 'react';

type Props = {
  userImageURL: string;
  userName: string;
  postedOn: string | Date;
  courseModule: string;
};

function QuestionCardHeader({
  userImageURL,
  userName,
  postedOn,
  courseModule,
}: Props) {
  return (
    <section className="questionHeader flex items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
      <div className="flex items-center">
        <Image
          alt="user_photo"
          src={userImageURL}
          width={40}
          height={40}
          className="mr-2 rounded-3xl"
        />
        <p>
          {userName} posted {getPostedOnInDays(postedOn)}
        </p>
      </div>

      <p className="mx-4">{courseModule}</p>
    </section>
  );
}

export default QuestionCardHeader;
