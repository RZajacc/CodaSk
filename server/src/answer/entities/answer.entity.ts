import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({
  collection: 'answers',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Answer {
  @ApiProperty({ example: '65816d209fe28bb962481f28' })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ example: ['6580efc5e3ee1dc025e552db'] })
  author: Types.ObjectId | User;

  @Prop({ required: true })
  @ApiProperty({ example: '2023-12-19T10:14:56.217+00:00' })
  posted_on: Date;

  @Prop({ required: true })
  @ApiProperty({ example: 'Solution to the problem' })
  message: string;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  @ApiProperty({ example: ['658164f13468b3af52b44ff1'] })
  question: Types.ObjectId | Question;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: false,
  })
  @ApiProperty({ example: ['656b4777d89e223b1e928c33'] })
  votes: Types.ObjectId[] | User[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
