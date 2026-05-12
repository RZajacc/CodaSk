import type {Question} from './QuestionTypes.ts';
import type {Answer} from './AnswerTypes.ts';
import type {Tag} from './TagTypes.ts';

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_photo: string;
  questions: string[] | Question[];
  answers: string[] | Answer[];
  saved_tags: string[] | Tag[];
  member_since: string;
  last_seen: string;
  bio: string;
  cohort_name: string;
  course_type: string;
  github: string;
  location: {
    country: string;
    city: string;
  };
  user_permission: string;
  website: string;
  course_date: string;
}
