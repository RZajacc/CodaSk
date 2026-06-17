import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  @ApiProperty({ example: 'test' })
  _id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true })
  posted_on: Date;

  @Prop({ required: true })
  message: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  question: Question;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: false,
  })
  votes: User[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
