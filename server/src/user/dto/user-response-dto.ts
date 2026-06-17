import { Types } from 'mongoose';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../entities/user.entity';

export class UserResponseDto extends User {
  // _id: Types.ObjectId;
  //
  // email: string;
  //
  // password: string;
  //
  // user_photo: string;
  //
  // questions: Question[];
  //
  // answers: Answer[];
  //
  // saved_tags: Tag[];
  //
  // member_since: Date;
  //
  // last_seen: Date;
  //
  // bio: string;
  //
  // cohort_name: string;
  //
  // course_type: string;
  //
  // first_name: string;
  //
  // github: string;
  //
  // last_name: string;
  //
  // location: {
  //   city: string;
  //   country: string;
  // };
  //
  // user_permission: string;
  //
  // website: string;
  //
  // course_date: Date;
}
