import {gql} from '@apollo/client';

export const GET_QUESTIONS = gql`
  query getAllQuestions($sortBy: String) {
    getAllQuestions(sortBy: $sortBy) {
      id
      author {
        id
        first_name
        user_photo
      }
      posted_on
      title
      problem_description
      solution_tried
      module
      tags {
        id
        name
      }
      answers {
        id
      }
      saved_by {
        first_name
      }
      status
    }
  }
`;

export const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($getQuestionByIdId: ID!) {
    getQuestionById(id: $getQuestionByIdId) {
      id
      title
      posted_on
      module
      problem_description
      solution_tried
      github_repo
      status
      tags {
        id
        name
      }
      author {
        id
        first_name
        user_photo
      }
      answers {
        id
        posted_on
        message
        votes {
          id
        }
        author {
          id
          first_name
          user_photo
        }
      }
    }
  }
`;

export const GET_QUESTIONS_BY_TAG = gql`
  query getQuestionsByTagName($tag: ID!, $sortBy: String) {
    getQuestionsByTagName(tag: $tag, sortBy: $sortBy) {
      id
      author {
        id
        first_name
        user_photo
      }
      posted_on
      title
      problem_description
      solution_tried
      module
      tags {
        id
        name
      }
      answers {
        id
      }
      saved_by {
        first_name
      }
      status
    }
  }
`;

/// MUTATIONS ///
export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($deleteQuestionId: ID) {
    deleteQuestion(id: $deleteQuestionId) {
      id
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      status
    }
  }
`;

export const UPDATE_QUESTION_T = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      title
    }
  }
`;

export const POST_NEWQUESTION = gql`
  mutation AddQuestion($newQuestion: newQuestionInput) {
    addQuestion(newQuestion: $newQuestion) {
      id
    }
  }
`;
