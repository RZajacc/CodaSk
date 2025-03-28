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
import {divideString} from '@/utils/QuillTextProcessor';
import {deleteInlineStyles} from '@/utils/CleanInlineStyles';

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

  // Prepare quill generated text to display
  const divideDescString = divideString(questionObj.problem_description);
  const problemDesc = deleteInlineStyles(divideDescString);

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
      <section className="title my-3 pl-6 font-semibold text-[#6741D9]">
        {questionObj.title}
      </section>

      {/* Description section */}
      <section className="desc mb-3 line-clamp-5 px-6">
        {problemDesc &&
          problemDesc.map((problem, idx) => {
            return (
              <div
                className={
                  problem.type === 'text'
                    ? ''
                    : 'my-3 rounded-xl bg-black px-3 py-1 text-white'
                }
                key={idx}
              >
                {parse(problem.data)}
              </div>
            );
          })}
      </section>

      {/* Tags */}
      <section className="flex gap-2 pl-8">
        {questionObj.tags &&
          questionObj.tags.map((tag, indexT) => {
            return (
              <Link
                className="whitespace-nowrap rounded-md bg-black p-2 text-white no-underline"
                key={indexT}
                href={{
                  pathname: `/search/questions/tagged/${tag.id}`,
                  query: {
                    name: tag.name,
                  },
                }}
              >
                {tag.name}
              </Link>
            );
          })}
      </section>

      {/* Answers section */}
      <section className="answers my-3 flex items-center gap-1 pl-6">
        {questionObj.status === 'Solved' && <FaCheckCircle color="#088F8F" />}
        {questionObj.answers.length === 1 ? (
          <>
            <span className="font-bold"> {questionObj.answers.length}</span>{' '}
            answer
          </>
        ) : (
          <>
            <span className="font-bold">{questionObj.answers.length}</span>
            answers
          </>
        )}
      </section>

      {/* Edit */}
      <section className="opt my-3 flex items-center justify-center gap-5 pr-3">
        {userID === questionObj?.author.id && (
          <>
            <button
              onClick={() => {
                handeleDeleteQuestion(questionObj?.id);
              }}
            >
              <FaTrashAlt className="h-6" />
            </button>
            <button>
              <FaPen className="h-6" />
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default QuestionCard;
