import React from 'react';
import QuestionCard from './QuestionCard';
import {questionQuery} from '@/types/questionDetailsTypes';
import Loader from './Loader';
import NoQuestionsFound from './NoQuestionsFound';

type Props = {
  filteredData?: {getAllQuestions: questionQuery[]};
  loading: boolean;
};

function QuestionsGrid({filteredData, loading}: Props) {
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
            <QuestionCard key={questionObj.id} questionObj={questionObj} />
          );
        })}
    </div>
  );
}

export default QuestionsGrid;
