'use client';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import QuestionsGrid from '@/components/questions/QuestionsGrid';
import QuestionButtons from '@/components/questions/QuestionButtons';
import {GET_QUESTIONS} from '@/graphQL/questionQueries';
import {SortByOptions} from '@/components/questions/SortByOptions';

function Question() {
  const [sortBy, setSortBy] = useState('All');

  const {data: filteredData, loading} = useQuery(GET_QUESTIONS, {
    variables: {
      sortBy,
    },
  });

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div>
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 sm:mb-8 sm:flex sm:justify-between">
        <h1 className=" mt-4 text-left text-2xl font-medium text-[#6741D9] sm:text-3xl">
          Search among {filteredData?.getAllQuestions.length} questions
        </h1>
        <QuestionButtons />
      </div>

      <div className="border-b-2 border-b-[#D9D9D9]">
        <SortByOptions
          title="Sort by:"
          handleSortChange={handleSortChange}
          options={['All', 'Popular', 'Oldest', 'Unanswered', 'Solved']}
          margin="mb-4"
        />
      </div>

      {/* SORTING OPTIONS */}

      {/* GRID SECTION */}
      <div className="sm:mx-8">
        <QuestionsGrid filteredData={filteredData} loading={loading} />
      </div>
    </div>
  );
}

export default Question;
