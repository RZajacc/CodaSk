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
import QuestionCardHeader from './questionCard/QuestionCardHeader';

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
    <div className=" my-4 rounded-2xl bg-[#EDE9E6] hover:bg-gray-300">
      {/* QUESTION BOX HEADER */}
      <QuestionCardHeader
        userImageURL={questionObj.author.user_photo}
        userName={questionObj.author.first_name}
        postedOn={questionObj.posted_on}
        courseModule={questionObj.module}
      />

      {/* QUESTION BOX BODY */}
      <div className="flex cursor-pointer flex-row items-center ">
        {/* BODY WRAPPER */}
        <div className="mx-4 w-full max-w-7xl p-4">
          {/* QUESTION ACTUAL BODY */}
          <div
            onClick={() => {
              handleQuestionRedirect(questionObj?.id);
            }}
          >
            {/* Question title */}
            <div className="mb-2 flex flex-row justify-between font-semibold text-[#6741D9]">
              <p className="break-words">{questionObj.title}</p>
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
            {/* Problem description */}
            <div className="max-h-6 overflow-hidden truncate text-ellipsis pr-4">
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
            {/* EDIT/DELETE BUTTONS - NOT WORKING!*/}
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
