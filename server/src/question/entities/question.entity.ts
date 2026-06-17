import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { ApiProperty } from '@nestjs/swagger';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
  collection: 'questions',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Question {
  @ApiProperty({ example: '658164f13468b3af52b44ff1' })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  author: Types.ObjectId | User;

  @Prop({ required: true })
  @ApiProperty({ example: '2023-12-19T09:40:01.839+00:00' })
  posted_on: Date;

  @Prop({ required: true })
  @ApiProperty({ example: 'Dont know how to center a div' })
  title: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'It renders on top left and i cannot move it to the middle',
  })
  problem_description: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'I tried asking ChatGPT, he doesnt know either' })
  solution_tried: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'MODULE 3' })
  module: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'myrepo.github' })
  github_repo: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Tag' }],
    required: false,
  })
  @ApiProperty({ example: ['6571e499341b66e23bc6b370'] })
  tags: Types.ObjectId[] | Tag[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    required: false,
  })
  @ApiProperty({ example: ['65816d209fe28bb962481f28'] })
  answers: Types.ObjectId[] | Answer[];

  @ApiProperty({ example: 1 })
  answersCount: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: false,
  })
  @ApiProperty({ example: ['656b4777d89e223b1e928c33'] })
  saved_by: Types.ObjectId[] | User[];

  @Prop({ default: 'unanswered' })
  @ApiProperty({ example: 'unanswered' })
  status: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
