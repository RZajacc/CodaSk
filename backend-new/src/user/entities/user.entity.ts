import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  user_photo: string;

  @Prop({ required: false })
  questions: string[];

  @Prop({ required: false })
  answers: string[];

  @Prop({ required: false })
  saved_tags: string[];

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
