import React from 'react';
import QuestionCard from './QuestionCard';
import {questionQuery} from '@/types/questionDetailsTypes';
import Loader from './Loader';

type Props = {
  filteredData: questionQuery;
  deleteQuestion: ({
    variables: {deleteQuestionId},
  }: {
    variables: {deleteQuestionId: string};
  }) => void;
  loading: boolean;
};

function QuestionsGrid({filteredData, deleteQuestion, loading}: Props) {
  return (
    <div className="grid">
      {loading && <Loader />}
      <QuestionCard
        filteredData={filteredData}
        deleteQuestion={deleteQuestion}
        loading={loading}
      />
    </div>
  );
}

export default QuestionsGrid;
