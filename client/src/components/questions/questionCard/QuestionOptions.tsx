import {FaTrashAlt, FaPen} from 'react-icons/fa';

type Props = {
  userId: string | undefined;
  questionAuthorId: string;
  questionId: string;
};

function QuestionOptions({userId, questionAuthorId, questionId}: Props) {
  // DELETE HANDLER
  const handeleDeleteQuestion = async (questionID: string) => {
    console.log(questionID);
    // const deleteConfirm = window.confirm(
    //   'Are you SURE you want to delete your question?'
    // );
    // if (deleteConfirm) {
    //   deleteQuestion({
    //     variables: {
    //       deleteQuestionId: questionID,
    //     },
    //   });
    // }
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
