import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsJWT,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

@ApiSchema({ description: 'Description of the CreateUser DTO' })
export class CreateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', minimum: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'imageurl' })
  @IsUrl()
  @IsOptional()
  user_photo: string;

  @ApiProperty({ example: ['65816e591e4d4469b30ef592'] })
  @IsArray()
  @IsOptional()
  questions: Types.ObjectId[] | Question[];

  @ApiProperty({ example: ['65816d209fe28bb962481f28'] })
  @IsArray()
  @IsOptional()
  answers: Types.ObjectId[] | Answer[];

  @ApiProperty({ example: ['6571c0dd341b66e23bc6b345'] })
  @IsArray()
  @IsOptional()
  saved_tags: Types.ObjectId[] | Tag[];

  @ApiProperty({ example: '2023-12-02T15:04:23.718+00:00' })
  @IsDateString()
  @IsOptional()
  member_since: Date;

  @ApiProperty({ example: '2023-12-02T15:04:23.718+00:00' })
  @IsDateString()
  @IsOptional()
  last_seen: Date;

  @ApiProperty({ example: 'User bio' })
  @IsOptional()
  bio: string;

  @ApiProperty({ example: 'Orange Pigs' })
  @IsString()
  @IsOptional()
  cohort_name: string;

  @ApiProperty({ example: 'Web Development' })
  @IsString()
  @IsOptional()
  course_type: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({ example: 'GithubURL' })
  @IsString()
  @IsOptional()
  github: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    example: {
      city: 'Berlin',
      country: 'Germany',
    },
  })
  @IsObject()
  @IsOptional()
  location: {
    city: string;
    country: string;
  };

  @ApiProperty({ example: 'Student' })
  @IsString()
  @IsOptional()
  user_permission: string;

  @ApiProperty({ example: 'WebsiteURL' })
  @IsString()
  @IsOptional()
  website: string;

  @ApiProperty({ example: '2022-07-11T06:31:15.000+00:00' })
  @IsDateString()
  @IsOptional()
  course_date: Date;

  @IsJWT()
  @IsOptional()
  refreshToken: string;
}
