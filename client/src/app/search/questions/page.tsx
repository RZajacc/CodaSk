'use client';
import React, {useEffect, useState} from 'react';
import QuestionsGrid from '@/components/questions/QuestionsGrid';
import QuestionButtons from '@/components/questions/QuestionButtons';
import {SortByOptions} from '@/components/questions/SortByOptions';

function Question() {
  const [sortBy, setSortBy] = useState('All');
  const [loading, setLoading] = useState(true);

  const [questionsData, setQuestionsData] = useState<{
    success: boolean;
    count: number;
    data: Question[];
  }>({success: false, count: 0, data: []});

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5008/api/questions/all')
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-2">
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 sm:mb-8 sm:flex sm:justify-between">
        <h1 className=" mt-4 text-left text-2xl font-medium text-[#6741D9] sm:text-3xl">
          Search among {questionsData.count} questions
        </h1>
        <QuestionButtons />
      </div>

      {/* SORTING OPTIONS */}
      <div className="border-b-2 border-b-[#D9D9D9]">
        <SortByOptions
          title="Sort by:"
          handleSortChange={handleSortChange}
          options={['All', 'Popular', 'Oldest', 'Unanswered', 'Solved']}
          margin="mb-4"
        />
      </div>

      {/* GRID SECTION */}
      <div className="sm:mx-8">
        <QuestionsGrid
          questionsData={questionsData.data}
          dataCount={questionsData.count}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Question;
