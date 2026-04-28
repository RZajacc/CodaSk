export class UserResponseDto {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_photo: string;
  questions: string[];
  answers: string[];
  saved_tags: string[];
  member_since: Date;
  last_seen: Date;
  bio: string;
  cohort_name: string;
  course_type: string;
  github: string;
  location: {
    city: string;
    country: string;
  };
  user_permission: string;
  website: string;
  course_date: Date;
}
