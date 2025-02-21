import {gql} from '@apollo/client';

// ------------QUERIES--------------------
export const GET_ALL_ANSWERS = gql`
  query GetAllAnswers {
    getAllAnswers {
      author {
        id
        first_name
        user_photo
      }
      id
      posted_on
      message
      votes {
        id
      }
    }
  }
`;

// -----------MUTATIONS------------------------
export const POST_NEW_ANSWER = gql`
  mutation Mutation($newAnswer: newAnswerInput) {
    addAnswer(newAnswer: $newAnswer) {
      id
    }
  }
`;

export const DELETE_ANSWER = gql`
  mutation Mutation($deleteAnswerId: ID) {
    deleteAnswer(id: $deleteAnswerId) {
      message
    }
  }
`;

export const UPDATE_ANSWER = gql`
  mutation UpdateAnswer($updateAnswerId: ID, $userId: ID!) {
    updateAnswer(id: $updateAnswerId, userID: $userId) {
      message
    }
  }
`;
