'use client';
import {BOOKMARK_TAG, GET_TAGS, UNBOOKMARK_TAG} from '@/graphQL/tagsQueries';
import {GET_USER_BY_ID} from '@/graphQL/userQueries';
import QuestionButtons from '@/components/questions/QuestionButtons';
import TagsGrid from '@/components/tags/TagsGrid';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useSession} from 'next-auth/react';
import React, {ChangeEvent, useState} from 'react';

/// QUERIES ///
export type tagQuery = {
  getAllTags: [
    {
      course_type: string;
      description: string;
      id: string;
      name: string;
      related_questions: [
        {
          id: string;
        },
      ];
    },
  ];
};

export type userQuery = {
  getUserById: {
    id: string;
    saved_tags: string[];
  };
};

export default function Tags() {
  const session = useSession();
  const sessionUserID = session?.data?.user?.name as string;

  const {data: userData, loading} = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: sessionUserID,
    },
  });

  const [bookmarkTag] = useMutation(BOOKMARK_TAG, {
    refetchQueries: [GET_USER_BY_ID, 'getUserById'],
  });
  const [unbookmarkTag] = useMutation(UNBOOKMARK_TAG, {
    refetchQueries: [GET_USER_BY_ID, 'getUserById'],
  });

  const [sortBy, setSortBy] = useState('All');

  const {data: filteredTags} = useQuery(GET_TAGS, {
    variables: {
      sortBy,
    },
  });

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.toLowerCase();
    setSearchInput(normalizedQuery);
  };

  return (
    <div className="h-full min-h-screen w-full">
      {/* TOP SECTION */}
      <div className=" flex flex-row items-start justify-between px-6 py-6">
        <h1 className=" mx-8 mt-4 text-left font-medium text-[#6741D9] md:text-3xl">
          Search among {filteredTags?.getAllTags.length} tags
        </h1>
        <div>
          <QuestionButtons />
        </div>
      </div>
      {/* SEARCH BAR */}
      <div className="sortByBox mb-4 flex flex-row justify-between border-b-2 border-b-[#D9D9D9] p-4">
        <input
          type="search"
          id="default-search"
          className="placeholder:text-gray-black block w-fit rounded-3xl border bg-[#EDE9E6] p-4 ps-5 text-sm  text-gray-900 placeholder:text-left placeholder:text-base placeholder:font-extralight "
          placeholder="search for keywords, tags, questions..."
          required
          onChange={handleSearchInput}
          value={searchInput}
        />
        <span className="relative w-fit"></span>
        {/* SORT BY FILTERS */}
        <div className="flex flex-row items-center justify-center">
          <span className="flex cursor-pointer  flex-row text-lg font-normal text-[#6741D9]">
            Sort by:
            <ul className="flex list-none flex-row">
              <li
                onClick={() => handleSortChange('All')}
                className=" px-1"
                value={'All'}
              >
                All<span className="font-semibold text-black"> | </span>
              </li>
              <li
                onClick={() => handleSortChange('Name')}
                className=" px-1"
                value={'Name'}
              >
                Name<span className="font-semibold text-black"> | </span>
              </li>
              <li
                onClick={() => handleSortChange('Popular')}
                className=" px-1"
                value={'Popular'}
              >
                Popular<span className="font-semibold text-black"></span>
              </li>
            </ul>
          </span>
          <select
            className="mx-2 rounded-full bg-black p-2 font-medium text-white"
            onChange={(e) => handleSortChange(e.target.value)}
            name="course_type"
            // placeholder="course type"
          >
            <option value={'All'}>course type</option>
            <option value={'Web Development'}>web development</option>
            <option value={'Data Analytics'}>data analytics</option>
          </select>
        </div>
      </div>
      {/* TAGS GRID */}
      <div className="mx-8">
        <TagsGrid
          data={filteredTags}
          bookmarkTag={bookmarkTag}
          unbookmarkTag={unbookmarkTag}
          userData={userData}
          loading={loading}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
    </div>
  );
}
