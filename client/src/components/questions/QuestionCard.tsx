import React from 'react';
import Link from 'next/link';

import 'react-quill/dist/quill.snow.css';
import {useSession} from 'next-auth/react';
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
};

function QuestionCard({questionObj}: Props) {
  const session = useSession();
  const userID = session?.data?.user?._id;

  // Prepare quill generated text to display
  const divideDescString = divideString(questionObj.problem_description);
  const problemDesc = deleteInlineStyles(divideDescString);

  // console.log(questionObj.tags[0]);
  return (
    <div className="questionCard grid gap-2 rounded-2xl bg-[#EDE9E6] no-underline hover:bg-gray-300 hover:font-normal">
      {/* QUESTION BOX HEADER */}
      <QuestionCardHeader
        userImageURL={questionObj.author.user_photo}
        userName={questionObj.author.first_name}
        postedOn={questionObj.posted_on}
        courseModule={questionObj.module}
      />

      {/* Question Body */}
      <Link
        href={`/search/questions/${questionObj.id}`}
        className="questionsBody grid gap-1 px-6  no-underline hover:font-normal"
      >
        <section className="font-semibold text-[#6741D9]">
          {questionObj.title}
        </section>
        {/* Content section */}
        <section className="line-clamp-5 ">
          {problemDesc &&
            problemDesc.map((problem, idx) => {
              return <ProblemDescription problem={problem} key={idx} />;
            })}
        </section>
      </Link>

      {/* Tags */}
      <section className="flex gap-2 px-8">
        {questionObj.tags &&
          questionObj.tags.map((tag) => {
            return <TagPill tagName={tag.name} tagId={tag.id} key={tag.id} />;
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
      />
    </div>
  );
}

export default QuestionCard;
