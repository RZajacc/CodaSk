import React from 'react';
import {FaTrashAlt, FaPen} from 'react-icons/fa';
import {DELETE_QUESTION, GET_QUESTIONS} from '@/graphQL/questionQueries';
import {useMutation} from '@apollo/client';

type Props = {
  userId: string | undefined;
  questionAuthorId: string;
  questionId: string;
};

function QuestionOptions({userId, questionAuthorId, questionId}: Props) {
  // DELETE MUTATION
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, 'getAllQuestions'],
  });

  // DELETE HANDLER
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
    }
  };

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
