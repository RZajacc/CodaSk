import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  // Populate
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

  // Populate
  @Prop({ required: false })
  tags: string[];

  // Populate
  @Prop({ required: false })
  answers: string[];

  // Populate
  @Prop({ required: false })
  saved_by: string[];

  @Prop({ default: 'unanswered' })
  status: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
