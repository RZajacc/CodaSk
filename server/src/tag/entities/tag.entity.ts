import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../../question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

export type TagDocument = HydratedDocument<Tag>;

@Schema({
  collection: 'tags',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Tag {
  @ApiProperty({ example: '6571c0dd341b66e23bc6b345' })
  _id: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ example: 'javascript' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'Tag description' })
  description: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    required: false,
  })
  @ApiProperty({ example: ['658164f13468b3af52b44ff1'] })
  related_questions: Types.ObjectId[] | Question[];

  @Prop({ required: true })
  @ApiProperty({ example: 'Web Development' })
  course_type: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
