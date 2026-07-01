import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class User {
  @ApiProperty({ example: '6580ed55e3ee1dc025e552d9' })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'imageurl' })
  user_photo: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    required: false,
  })
  @ApiProperty({ example: ['65816e591e4d4469b30ef592'] })
  questions: Types.ObjectId[] | Question[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    required: false,
  })
  @ApiProperty({ example: ['65816d209fe28bb962481f28'] })
  answers: Types.ObjectId[] | Answer[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Tag' }],
    required: false,
  })
  @ApiProperty({ example: ['6571c0dd341b66e23bc6b345'] })
  saved_tags: Types.ObjectId[] | Tag[];

  @Prop({ required: false })
  @ApiProperty({ example: '2023-12-02T15:04:23.718+00:00' })
  member_since: Date;

  @Prop({ required: false })
  @ApiProperty({ example: '2023-12-02T15:04:23.718+00:00' })
  last_seen: Date;

  @Prop({ required: false, maxlength: 255 })
  @ApiProperty({ example: 'User bio' })
  bio: string;

  @Prop({ required: false, maxlength: 50 })
  @ApiProperty({ example: 'Orange Pigs' })
  cohort_name: string;

  @Prop({ required: false, maxlength: 50 })
  @ApiProperty({ example: 'Web Development' })
  course_type: string;

  @Prop({ required: false, maxlength: 50 })
  @ApiProperty({ example: 'John' })
  first_name: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'GithubURL' })
  github: string;

  @Prop({ required: false, maxlength: 50 })
  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @Prop({ required: false, type: Object })
  @ApiProperty({
    example: {
      city: 'Berlin',
      country: 'Germany',
    },
  })
  location: {
    city: string;
    country: string;
  };

  @Prop({ required: false, maxlength: 50, default: 'Student' })
  @ApiProperty({ example: 'Student' })
  user_permission: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'WebsiteURL' })
  website: string;

  @Prop({ required: false })
  @ApiProperty({ example: '2022-07-11T06:31:15.000+00:00' })
  course_date: Date;

  @Prop({ required: false })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
