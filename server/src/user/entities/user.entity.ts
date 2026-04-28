import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: false })
  user_photo: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    required: false,
  })
  questions: Types.ObjectId[] | Question[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    required: false,
  })
  answers: Types.ObjectId[] | Answer[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Tag' }],
    required: false,
  })
  saved_tags: Types.ObjectId[] | Tag[];

  @Prop({ required: false })
  member_since: Date;

  @Prop({ required: false })
  last_seen: Date;

  @Prop({ required: false, maxlength: 255 })
  bio: string;

  @Prop({ required: false, maxlength: 50 })
  cohort_name: string;

  @Prop({ required: false, maxlength: 50 })
  course_type: string;

  @Prop({ required: false, maxlength: 50 })
  first_name: string;

  @Prop({ required: false })
  github: string;

  @Prop({ required: false, maxlength: 50 })
  last_name: string;

  @Prop({ required: false, type: Object })
  location: {
    city: string;
    country: string;
  };

  @Prop({ required: false, maxlength: 50, default: 'Student' })
  user_permission: string;

  @Prop({ required: false })
  website: string;

  @Prop({ required: false })
  course_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
