'use client';
import {useSession} from 'next-auth/react';
import React, {useState} from 'react';
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import QuestionsGrid from '@/components/questions/QuestionsGrid';
import QuestionButtons from '@/components/questions/QuestionButtons';
import {DELETE_QUESTION, GET_QUESTIONS} from '@/graphQL/questionQueries';
import SortOptionItem from '@/components/questions/SortOptionItem';

/// QUERIES ///
export type questionQuery = {
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

function Question() {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, 'getAllQuestions'],
  });

  const [sortBy, setSortBy] = useState('All');

  const {data: filteredData, loading} = useQuery(GET_QUESTIONS, {
    variables: {
      sortBy,
    },
  });
  // console.log('filteredData :>> ', filteredData);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="w-full">
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 py-6 md:flex md:justify-between">
        <h1 className=" mt-4 text-left text-2xl font-medium text-[#6741D9] md:text-3xl">
          Search among {filteredData?.getAllQuestions.length} questions
        </h1>
        <QuestionButtons />
      </div>

      {/* SORTING OPTIONS */}
      <div className="flex border-b-2 border-b-[#D9D9D9] p-2 text-lg text-[#6741D9]">
        Sort by:
        <ul className="flex cursor-pointer list-none flex-row flex-wrap">
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
        </ul>
      </div>

      {/* GRID SECTION */}
      <div className="mx-8">
        <QuestionsGrid
          filteredData={filteredData}
          deleteQuestion={deleteQuestion}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Question;
