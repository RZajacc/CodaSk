import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../../question/entities/question.entity';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    required: false,
  })
  related_questions: Question[];

  @Prop({ required: true })
  course_type: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
