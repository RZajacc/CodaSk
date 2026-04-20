import {useState} from 'react';
import QuestionsGrid from '../../../../components/questions/QuestionsGrid';
import {Link, useParams} from 'react-router';

export type questionByTagQuery = {
  getQuestionsByTagName: [
    {
      id: string;
      author: {
        id: string;
        first_name: string;
        user_photo: string;
      };
      posted_on: Date;
      title: string;
      problem_description: string;
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

export default function TaggedQuestions() {
  const params = useParams<{id: string}>();
  const questionId = params.id;

  const [sortBy, setSortBy] = useState('All');

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="h-full min-h-screen w-full">
      {/* TOP SECTION */}
      <div className="flex flex-row items-start justify-between px-6 py-6">
        <h1 className="mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          {/*Search among {tagData?.getQuestionsByTagName.length} questions{' '}*/}
          {/*{tag ? <>tagged {tag}</> : ''}*/}
          Search among xxx tagged questions
        </h1>
        <Link
          className="my-2 rounded-full bg-black px-4 py-2 text-center font-bold text-white no-underline hover:bg-[#B197FC]"
          to={'/search/questions/askQuestion'}
        >
          Ask a question
        </Link>
      </div>

      <div className="sortByBox mb-4 flex flex-row border-b-2 border-b-[#D9D9D9] p-2">
        <span className="flex flex-row text-lg font-normal text-[#6741D9]">
          Sort by:
          <ul className="flex cursor-pointer list-none flex-row">
            <li
              onClick={() => handleSortChange('All')}
              className="px-1"
              value={'All'}
            >
              All<span className="font-semibold text-black"> | </span>
            </li>
            <li
              onClick={() => handleSortChange('Popular')}
              className="px-1"
              value={'Popular'}
            >
              Popular<span className="font-semibold text-black"> |</span>
            </li>
            <li
              onClick={() => handleSortChange('Oldest')}
              className="px-1"
              value={'Oldest'}
            >
              Oldest<span className="font-semibold text-black"> | </span>
            </li>
            <li
              onClick={() => handleSortChange('Unanswered')}
              className="px-1"
              value={'Unanswered'}
            >
              Unanswered<span className="font-semibold text-black"> |</span>
            </li>
            <li
              onClick={() => handleSortChange('Solved')}
              className="px-1"
              value={'Solved'}
            >
              Solved
            </li>
          </ul>
        </span>
      </div>

      {/* GRID SECTION */}
      <div className="mx-8">
        {/* <QuestionsGrid
          filteredTagData={filteredTagData}
          deleteQuestion={deleteQuestion}
          loading={loading}
        /> */}
      </div>
    </div>
  );
}
