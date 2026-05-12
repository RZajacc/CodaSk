import type {User} from './UserTypes.ts';
import type {Question} from './QuestionTypes.ts';

export interface Answer {
  _id: string;
  author: string | User;
  posted_on: string;
  message: string;
  question: string | Question;
  votes: string[] | User[];
}
