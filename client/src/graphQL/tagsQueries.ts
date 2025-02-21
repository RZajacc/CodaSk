import {gql} from '@apollo/client';

export const GET_ALLTAGS_MIN = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      course_type
    }
  }
`;

export const GET_TAGS = gql`
  query getAllTags($sortBy: String) {
    getAllTags(sortBy: $sortBy) {
      course_type
      description
      id
      name
      related_questions {
        id
      }
    }
  }
`;

/// MUTATIONS ///
export const BOOKMARK_TAG = gql`
  mutation BookmarkTag($userId: ID, $tagId: ID) {
    bookmarkTag(userId: $userId, tagId: $tagId) {
      id
    }
  }
`;

export const UNBOOKMARK_TAG = gql`
  mutation UnbookmarkTag($userId: ID, $tagId: ID) {
    unbookmarkTag(userId: $userId, tagId: $tagId) {
      id
    }
  }
`;

export const UPDATE_TAGS = gql`
  mutation UpdateTags($updateTagsId: [ID], $editInput: editTagInput) {
    updateTags(id: $updateTagsId, editInput: $editInput) {
      name
    }
  }
`;
