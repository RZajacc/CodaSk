import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {FaTrashAlt, FaPen, FaCheckCircle} from 'react-icons/fa';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';
import Loader from './Loader';

import {questionQuery} from '@/types/questionDetailsTypes';

type Props = {
  questionObj: questionQuery;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
  loading: boolean;
};

function QuestionCard({questionObj, deleteQuestion, loading}: Props) {
  const session = useSession();
  const userID = session?.data?.user?._id;
  const router = useRouter();

  const handleQuestionRedirect = (questionID: string) => {
    router.push(`/search/questions/${questionID}`);
  };

  const handeleDeleteQuestion = async (questionID: string) => {
    const deleteConfirm = window.confirm(
      'Are you SURE you want to delete your question?'
    );
    if (deleteConfirm) {
      deleteQuestion({
        variables: {
          deleteQuestionId: questionID,
        },
      });
      location.reload();
    }
  };

  return (
    <div className=" my-4 max-w-full  rounded-2xl bg-[#EDE9E6] hover:bg-gray-300">
      {/* QUESTION BOX HEADER */}
      <div className="flex flex-row items-center justify-between rounded-xl bg-black p-2 text-base font-light text-white">
        <div className="leftSideHeader flex items-center">
          <Image
            alt="user_photo"
            src={questionObj.author?.user_photo}
            width={40}
            height={40}
            className="mr-2 rounded-3xl"
          />
          <p>
            {questionObj.author?.first_name} posted{' '}
            {getPostedOnInDays(questionObj.posted_on)}
          </p>
        </div>

        <p className="mx-4">{questionObj.module}</p>
      </div>

      {/* QUESTION BOX BODY */}

      <div className="flex h-full cursor-pointer flex-row items-center ">
        <div className="questionBoxBody mx-4 w-full max-w-7xl p-4">
          <div
            onClick={() => {
              handleQuestionRedirect(questionObj?.id);
            }}
          >
            <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
              <p className="">{questionObj.title}</p>
              <div className="flex flex-row items-center justify-center">
                {questionObj.status === 'Solved' ? (
                  <div className="mx-2">
                    <FaCheckCircle color="#088F8F" />
                  </div>
                ) : (
                  <div></div>
                )}
                {questionObj.answers && questionObj.answers.length <= 1 ? (
                  <p>{questionObj.answers.length} answer</p>
                ) : (
                  <p>{questionObj.answers.length} answers</p>
                )}
              </div>
            </div>

            <div className="... max-h-6 overflow-hidden truncate text-ellipsis pr-4">
              <p>{parse(questionObj?.problem_description)}</p>
            </div>
          </div>
          {/* TAG BODY */}
          <div className="m-2 flex flex-row items-center justify-between">
            <div className="flex flex-row flex-wrap">
              {questionObj.tags &&
                questionObj.tags.map((tag, indexT) => {
                  return (
                    <div
                      key={indexT}
                      className="mx-2 my-2 w-max rounded-md bg-black p-2 text-white"
                    >
                      <Link
                        className="no-underline"
                        href={{
                          pathname: `/search/questions/tagged/${tag.id}`,
                          query: {
                            name: tag.name,
                          },
                        }}
                      >
                        {tag.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
            {/* EDIT/DELETE BUTTONS */}
            <div>
              {userID === questionObj?.author.id && (
                <>
                  <button
                    onClick={() => {
                      handeleDeleteQuestion(questionObj?.id);
                    }}
                    className="mx-2"
                  >
                    <FaTrashAlt />
                  </button>
                  <button className="mx-2">
                    <FaPen />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
