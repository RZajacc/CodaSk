'use client';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import QuestionsGrid from '@/components/questions/QuestionsGrid';
import QuestionButtons from '@/components/questions/QuestionButtons';
import {GET_QUESTIONS} from '@/graphQL/questionQueries';
import SortListOptionItem from '@/components/questions/SortListOptionItem';
import SortOptionItem from '@/components/questions/SortOptionItem';

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
    <div className="w-full">
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 py-6 sm:flex sm:justify-between">
        <h1 className=" mt-4 text-left text-2xl font-medium text-[#6741D9] sm:text-3xl">
          Search among {filteredData?.getAllQuestions.length} questions
        </h1>
        <QuestionButtons />
      </div>

      {/* SORTING OPTIONS */}
      <div className="flex items-center justify-center gap-3 border-b-2 border-b-[#D9D9D9] p-2 py-4 text-lg text-[#6741D9] sm:justify-start">
        Sort by:
        {/* Sort options for small screens */}
        <select className="rounded-full border-b-2 border-black p-2 text-center align-middle sm:hidden">
          <SortOptionItem handleSortChange={handleSortChange} option="All" />
          <SortOptionItem
            handleSortChange={handleSortChange}
            option="Popular"
          />
          <SortOptionItem handleSortChange={handleSortChange} option="Oldest" />
          <SortOptionItem
            handleSortChange={handleSortChange}
            option="Unanswered"
          />
          <SortOptionItem handleSortChange={handleSortChange} option="Solved" />
        </select>
        {/* Sort options for bigger screens */}
        <ul className="hidden cursor-pointer list-none flex-row flex-wrap sm:flex">
          <SortListOptionItem
            handleSortChange={handleSortChange}
            option="All"
            separator={true}
          />
          <SortListOptionItem
            handleSortChange={handleSortChange}
            option="Popular"
            separator={true}
          />
          <SortListOptionItem
            handleSortChange={handleSortChange}
            option="Oldest"
            separator={true}
          />
          <SortListOptionItem
            handleSortChange={handleSortChange}
            option="Unanswered"
            separator={true}
          />
          <SortListOptionItem
            handleSortChange={handleSortChange}
            option="Solved"
          />
        </ul>
      </div>

      {/* GRID SECTION */}
      <div className="sm:mx-8">
        <QuestionsGrid filteredData={filteredData} loading={loading} />
      </div>
    </div>
  );
}

export default Question;
