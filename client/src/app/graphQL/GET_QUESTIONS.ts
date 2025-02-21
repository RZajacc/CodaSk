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
