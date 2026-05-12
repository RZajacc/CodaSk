import type {Question} from './QuestionTypes.ts';

export interface Tag {
  _id: string;
  name: string;
  description: string;
  related_questions: string[] | Question[];
  course_type: string;
}
