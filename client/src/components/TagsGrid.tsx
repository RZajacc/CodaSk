import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import QuestionCard from './QuestionCard';
import {tagQuery, userQuery} from '@/pages/search/tags';
import TagCard from './TagCard';

type Props = {
  data: tagQuery;
  userData: userQuery;
  bookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
  unbookmarkTag: ({
    variables: {userId, tagId},
  }: {
    variables: {userId: string; tagId: string};
  }) => void;
  loading: boolean;
};

function TagsGrid({
  data,
  bookmarkTag,
  unbookmarkTag,
  userData,
  loading,
}: Props) {
  return (
    <div className="flex flex-col">
      <TagCard
        data={data}
        bookmarkTag={bookmarkTag}
        unbookmarkTag={unbookmarkTag}
        userData={userData}
        loading={loading}
      />
    </div>
  );
}

export default TagsGrid;
