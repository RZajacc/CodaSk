import React from 'react';
import QuestionCard from './QuestionCard';
import {questionQuery} from '@/types/questionDetailsTypes';
import Loader from './Loader';
import Link from 'next/link';
import NoQuestionsFound from './NoQuestionsFound';

type Props = {
  filteredData?: questionQuery;
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
    <div className="grid">
      {loading && <Loader />}
      {isQuestionsArrEmpty && <NoQuestionsFound />}

      <QuestionCard
        filteredData={filteredData}
        deleteQuestion={deleteQuestion}
        loading={loading}
      />
    </div>
  );
}

export default QuestionsGrid;
