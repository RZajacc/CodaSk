import type {User} from './UserTypes.ts';
import type {Tag} from './TagTypes.ts';
import type {Answer} from './AnswerTypes.ts';

export interface QuestionBase {
  _id: string;
  posted_on: string;
  title: string;
  problem_description: string;
  solution_tried: string;
  module: string;
  github_repo: string;
  status: string;
}

export interface QuestionByQuery extends QuestionBase {
  author: {
    _id: string;
    first_name: string;
    user_photo: string;
  };
  tags: {
    _id: string;
    name: string;
  }[];
  answers: string[];
  saved_by: string[];
}

export interface Question {
  _id: string;
  author: string | User;
  posted_on: string;
  title: string;
  problem_description: string;
  solution_tried: string;
  module: string;
  github_repo: string;
  tags: string[] | Tag[];
  answers: string[] | Answer[];
  saved_by: string[] | User[];
  status: string;
}

// Dodaj populated question!!
// export type Question = {
//   _id: string;
//   answers: {
//     _id: string;
//     posted_on: string;
//     message: string;
//     author: {_id: string; first_name: string; user_photo: string};
//     votes: string[];
//   }[];
//   author: {
//     _id: string;
//     first_name: string;
//     user_photo: string;
//   };
//   github_repo: string;
//   module: string;
//   posted_on: string;
//   problem_description: string;
//   solved_by: string[];
//   solution_tried: string;
//   status: string;
//   tags: {_id: string; name: string}[];
//   title: string;
// };
