import React from 'react';
import QuestionCard from './QuestionCard';
import {questionQuery} from '@/types/questionDetailsTypes';
import Loader from './Loader';
import NoQuestionsFound from './NoQuestionsFound';

type Props = {
  questionsData: Question[];
  dataCount: number;
  loading: boolean;
};

function QuestionsGrid({questionsData, dataCount, loading}: Props) {
  return (
    <div className="mt-4 grid gap-4">
      {/* Loading and empty array states */}
      {loading && <Loader />}
      {!loading && dataCount === 0 && <NoQuestionsFound />}

      {/* Display all questions */}
      {questionsData &&
        questionsData.map((questionObj) => {
          return (
            <QuestionCard key={questionObj._id} questionObj={questionObj} />
          );
        })}
    </div>
  );
}

export default QuestionsGrid;
