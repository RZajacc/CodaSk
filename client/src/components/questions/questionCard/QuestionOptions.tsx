import React from 'react';
import {FaTrashAlt, FaPen} from 'react-icons/fa';

type Props = {
  userId: string | undefined;
  questionAuthorId: string;
  questionId: string;
  handeleDeleteQuestion: (questionId: string) => void;
};

function QuestionOptions({
  userId,
  questionAuthorId,
  questionId,
  handeleDeleteQuestion,
}: Props) {
  return (
    <section className="opt flex items-center gap-5 px-6">
      {userId === questionAuthorId && (
        <>
          <button
            onClick={() => {
              handeleDeleteQuestion(questionId);
            }}
          >
            <FaTrashAlt className="h-6" />
          </button>
          <button
            onClick={() => {
              alert('Available soon!');
            }}
          >
            <FaPen className="h-6" />
          </button>
        </>
      )}
    </section>
  );
}

export default QuestionOptions;
