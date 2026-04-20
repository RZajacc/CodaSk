import {useEffect, useState} from 'react';
import {SortByOptions} from '../../../components/questions/SortByOptions.tsx';
import QuestionsGrid from '../../../components/questions/QuestionsGrid.tsx';
import type {Question} from '../../../types/QuestionTypes.ts';
import {Link} from 'react-router';

export default function QuestionsList() {
  const [sortBy, setSortBy] = useState('All');
  const [loading, setLoading] = useState(true);

  const [questionsData, setQuestionsData] = useState<Question[]>([]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  useEffect(() => {
    setLoading(true);
    // const baseUrl = BuildFetchUrl();
    const baseUrl = 'http://localhost:5000';
    // console.log('BASE URL :>> ', baseUrl);
    fetch(`${baseUrl}/question/search?filter=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA :>> ', data);
        setQuestionsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [sortBy]);

  return (
    <div className="p-2">
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 sm:mb-8 sm:flex sm:justify-between">
        <h1 className="content-center text-left text-2xl font-medium text-[#6741D9] sm:text-3xl">
          Search among {questionsData.length} questions
        </h1>
        <Link
          className="my-2 rounded-full bg-black px-4 py-2 text-center font-bold text-white no-underline hover:bg-[#B197FC]"
          to={'/search/questions/askQuestion'}
        >
          Ask a question
        </Link>
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
          questionsData={questionsData}
          dataCount={questionsData.length}
          loading={loading}
        />
      </div>
    </div>
  );
}
