import React from 'react';
import QuestionCard from './QuestionCard';
import {questionByTagQuery} from '@/app/search/questions/tagged/[id]/page';
// import {GET_QUESTIONS} from '@/app/search/questions/page';

type questionQuery = {
  getAllQuestions: [
    {
      id: string;
      author: {
        id: string;
        first_name: string;
        user_photo: string;
      };
      posted_on: Date | string;
      title: string;
      problem_description: string;
      solution_tried: string;
      module: string;
      tags: [
        {
          id: string;
          name: string;
        },
      ];
      answers: [
        {
          id: string;
        },
      ];
      saved_by: [
        {
          first_name: string;
        },
      ];
      status: string;
    },
  ];
};

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
    <div className="flex flex-col">
      <QuestionCard
        filteredData={filteredData}
        deleteQuestion={deleteQuestion}
        loading={loading}
      />
    </div>
  );
}

export default QuestionsGrid;
