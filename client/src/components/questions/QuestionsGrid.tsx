import React from 'react';
import QuestionCard from './QuestionCard';
import {questionQuery} from '@/types/questionDetailsTypes';
import Loader from './Loader';
import NoQuestionsFound from './NoQuestionsFound';

type Props = {
  filteredData?: {getAllQuestions: questionQuery[]};
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
  loading: boolean;
};

function QuestionsGrid({filteredData, deleteQuestion, loading}: Props) {
  const isQuestionsArrEmpty =
    (filteredData?.getAllQuestions ?? []).length === 0;

  return (
    <div className="mt-4 grid gap-4">
      {/* Loading and empty array states */}
      {loading && <Loader />}
      {isQuestionsArrEmpty && <NoQuestionsFound />}

      {/* Display all questions */}
      {filteredData &&
        filteredData.getAllQuestions.map((questionObj, index) => {
          return (
            <QuestionCard
              key={questionObj.id}
              questionObj={questionObj}
              deleteQuestion={deleteQuestion}
              loading={loading}
            />
          );
        })}
    </div>
  );
}

export default QuestionsGrid;
