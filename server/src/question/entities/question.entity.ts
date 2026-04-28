import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Answer } from '../../answer/entities/answer.entity';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  _id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  posted_on: Date;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  problem_description: string;

  @Prop({ required: true })
  solution_tried: string;

  @Prop({ required: false })
  module: string;

  @Prop({ required: false })
  github_repo: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    required: false,
  })
  tags: Tag[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    required: false,
  })
  answers: Answer[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: false,
  })
  saved_by: User[];

  @Prop({ default: 'unanswered' })
  status: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
