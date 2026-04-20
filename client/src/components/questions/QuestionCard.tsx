import 'react-quill/dist/quill.snow.css';
import QuestionCardHeader from './questionCard/QuestionCardHeader';
import ProblemDescription from './questionCard/ProblemDescription';
import TagPill from './questionCard/TagPill';
import AnswersCount from './questionCard/AnswersCount';
import QuestionOptions from './questionCard/QuestionOptions';
import type {Question} from '../../types/QuestionTypes.ts';
import {divideString} from '../../utils/QuillTextProcessor.tsx';
import {deleteInlineStyles} from '../../utils/CleanInlineStyles.tsx';
import {Link} from 'react-router';

type Props = {
  questionObj: Question;
};

function QuestionCard({questionObj}: Props) {
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
        to={`/search/questions/${questionObj._id}`}
        className="questionsBody grid gap-1 px-3 no-underline hover:font-normal"
      >
        <section className="questionTitle font-semibold text-[#6741D9]">
          {questionObj.title}
        </section>
        {/* Content section */}
        <section className="line-clamp-5">
          {problemDesc &&
            problemDesc.map((problem, idx) => {
              return <ProblemDescription problem={problem} key={idx} />;
            })}
        </section>
      </Link>

      {/* Tags */}
      <section className="questionsTags flex gap-2 px-4">
        {questionObj.tags &&
          questionObj.tags.map((tag) => {
            return <TagPill tagName={tag.name} tagId={tag._id} key={tag._id} />;
          })}
      </section>

      {/* Answers section */}
      <AnswersCount
        status={questionObj.status}
        count={questionObj.answers.length}
      />

      {/* Options */}
      <QuestionOptions
        userId={'123'}
        questionId={questionObj._id}
        questionAuthorId={questionObj.author._id}
      />
    </div>
  );
}

export default QuestionCard;
