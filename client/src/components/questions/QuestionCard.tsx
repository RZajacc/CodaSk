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
import ProblemDescription from './questionCard/ProblemDescription';

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

  console.log(problemDesc);
  return (
    <Link
      href={`/search/questions/${questionObj.id}`}
      className="questionCard grid gap-2 rounded-2xl bg-[#EDE9E6] no-underline hover:bg-gray-300 hover:font-normal"
    >
      {/* QUESTION BOX HEADER */}
      <QuestionCardHeader
        userImageURL={questionObj.author.user_photo}
        userName={questionObj.author.first_name}
        postedOn={questionObj.posted_on}
        courseModule={questionObj.module}
      />

      {/* Title Section */}
      <section className="title px-6 font-semibold text-[#6741D9]">
        {questionObj.title}
      </section>

      {/* Description section */}
      <section className="desc line-clamp-5 px-6">
        {problemDesc &&
          problemDesc.map((problem, idx) => {
            return <ProblemDescription problem={problem} idx={idx} />;
          })}
      </section>

      {/* Tags */}
      <section className="flex gap-2 px-8">
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
      <section className="answers mb-3 flex items-center gap-1 px-6">
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
      <section className="opt flex items-center gap-5 px-6">
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
    </Link>
  );
}

export default QuestionCard;
