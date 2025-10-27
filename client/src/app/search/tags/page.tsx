'use client';
import {BOOKMARK_TAG, GET_TAGS, UNBOOKMARK_TAG} from '@/graphQL/tagsQueries';
import {GET_USER_BY_ID} from '@/graphQL/userQueries';
import QuestionButtons from '@/components/questions/QuestionButtons';
import TagsGrid from '@/components/tags/TagsGrid';
import {useMutation, useQuery} from '@apollo/client';
import {useSession} from 'next-auth/react';
import React, {useState} from 'react';
import {SortByOptions} from '@/components/questions/SortByOptions';

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

  return (
    <div className="p-2">
      {/* TOP SECTION */}
      <div className=" grid justify-center px-6 sm:flex sm:justify-between">
        <h1 className=" mt-4 text-left text-2xl font-medium text-[#6741D9] md:text-3xl">
          Search among {filteredTags?.getAllTags.length} tags
        </h1>

        <QuestionButtons />
      </div>
      {/* SEARCH BAR */}
      <div className="grid justify-center gap-2 border-b-2 border-b-[#D9D9D9] px-6 sm:justify-start">
        {/* <input
          type="search"
          id="default-search"
          className="placeholder:text-gray-black w-72 rounded-3xl border bg-[#EDE9E6] p-2 text-sm text-gray-900  placeholder:text-base placeholder:font-extralight md:justify-self-center "
          placeholder="search for keywords, tags, questions..."
          required
          onChange={handleSearchInput}
          value={searchInput}
        /> */}
        <h2 className="text-center font-medium text-[#6741D9]  sm:text-start md:text-2xl">
          Search options:
        </h2>
        <SortByOptions
          title="Course:"
          handleSortChange={handleSortChange}
          options={['All', 'Web Development', 'Data Analytics']}
          // width="w-full"
        />

        <SortByOptions
          title="Sort by:"
          handleSortChange={handleSortChange}
          options={['All', 'Popular', 'Oldest', 'Unanswered', 'Solved']}
          width="w-full"
          margin="mb-4"
        />
      </div>
      {/* TAGS GRID */}
      <div className="mx-8">
        <TagsGrid
          data={filteredTags}
          bookmarkTag={bookmarkTag}
          unbookmarkTag={unbookmarkTag}
          userData={userData}
          loading={loading}
          // searchInput={searchInput}
          // setSearchInput={setSearchInput}
        />
      </div>
    </div>
  );
}
