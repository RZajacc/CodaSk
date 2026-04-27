import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  user_photo: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    required: false,
  })
  questions: Question[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    required: false,
  })
  answers: Answer[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    required: false,
  })
  saved_tags: Tag[];

  @Prop({ required: false })
  member_since: Date;

  @Prop({ required: false })
  last_seen: Date;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: false })
  cohort_name: string;

  @Prop({ required: false })
  cohort_type: string;

  @Prop({ required: false })
  first_name: string;

  @Prop({ required: false })
  github: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: false, type: Object })
  location: {
    city: string;
    country: string;
  };

  @Prop({ required: false })
  user_permission: string;

  @Prop({ required: false })
  website: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
