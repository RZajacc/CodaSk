import React from 'react';
import Link from 'next/link';

import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {getPostedOnInDays} from '@/utils/GetPostedOnInDays';

import {questionQuery} from '@/types/questionDetailsTypes';
import QuestionCardHeader from './questionCard/QuestionCardHeader';
import {divideString} from '@/utils/QuillTextProcessor';
import {deleteInlineStyles} from '@/utils/CleanInlineStyles';
import ProblemDescription from './questionCard/ProblemDescription';
import TagPill from './questionCard/TagPill';
import AnswersCount from './questionCard/AnswersCount';
import QuestionOptions from './questionCard/QuestionOptions';

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

  // console.log(questionObj.tags[0]);
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
            return <ProblemDescription problem={problem} key={idx} />;
          })}
      </section>

      {/* Tags */}
      <section className="flex gap-2 px-8">
        {questionObj.tags &&
          questionObj.tags.map((tag, idx) => {
            return <TagPill tagName={tag.name} key={idx} />;
          })}
      </section>

      {/* Answers section */}
      <AnswersCount
        status={questionObj.status}
        count={questionObj.answers.length}
      />

      {/* Options */}
      <QuestionOptions
        userId={userID}
        questionId={questionObj.id}
        questionAuthorId={questionObj.author.id}
        handeleDeleteQuestion={handeleDeleteQuestion}
      />
    </Link>
  );
}

export default QuestionCard;
