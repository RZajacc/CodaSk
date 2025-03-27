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
    <div className="questionCard my-4 rounded-2xl bg-[#EDE9E6] hover:bg-gray-300">
      {/* QUESTION BOX HEADER */}
      <QuestionCardHeader
        userImageURL={questionObj.author.user_photo}
        userName={questionObj.author.first_name}
        postedOn={questionObj.posted_on}
        courseModule={questionObj.module}
      />

      {/* Title Section */}
      <section className="title p-2 font-semibold text-[#6741D9]">
        {questionObj.title}
      </section>

      <section className="desc px-2 pb-2">
        {parse(questionObj.problem_description)}
      </section>

      {/* Tags */}
      <section className="flex gap-2 p-2">
        {questionObj.tags &&
          questionObj.tags.map((tag, indexT) => {
            return (
              <div key={indexT} className="rounded-md bg-black p-2 text-white">
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
      </section>

      {/* Answers section */}
      <section className="answers flex items-center gap-1 py-2 pl-4">
        {questionObj.status === 'Solved' && <FaCheckCircle color="#088F8F" />}
        {questionObj.answers.length === 1 ? (
          <>
            {questionObj.answers.length} <span>answer</span>
          </>
        ) : (
          <>
            {questionObj.answers.length}
            <span>answers</span>
          </>
        )}
      </section>

      {/* Edit */}
      <section className="opt flex items-center justify-center">
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
      </section>
    </div>
  );
}

export default QuestionCard;
