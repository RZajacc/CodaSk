import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { PopulatedAuthorDto } from './populated-author.dto';
import { PopulatedTagDto } from './populated-tag.dto';

export class FindByQueryResponseDto {
  @ApiProperty({ example: '658164f13468b3af52b44ff1' })
  @Expose()
  _id: string;

  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  @Expose()
  @Type(() => PopulatedAuthorDto)
  author: PopulatedAuthorDto;

  @ApiProperty({ example: '2023-12-19T09:40:01.839+00:00' })
  @Expose()
  posted_on: Date;

  @ApiProperty({ example: 'Dont know how to center a div' })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'It renders on top left and i cannot move it to the middle',
  })
  @Expose()
  problem_description: string;

  @ApiProperty({ example: 'I tried asking ChatGPT, he doesnt know either' })
  @Expose()
  solution_tried: string;

  @ApiProperty({ example: 'MODULE 3' })
  @Expose()
  module: string;

  @ApiProperty({ example: 'myrepo.github' })
  @Expose()
  github_repo: string;

  @ApiProperty({ example: ['6571e499341b66e23bc6b370'] })
  @Expose()
  @Type(() => PopulatedTagDto)
  tags: PopulatedTagDto[];

  @ApiProperty({ example: ['65816d209fe28bb962481f28'] })
  @Expose()
  answers: string[];

  @ApiProperty({ example: 1 })
  @Expose()
  answersCount: number;

  @ApiProperty({ example: [] })
  @Expose()
  saved_by: string[];

  @ApiProperty({ example: 'solved' })
  @Expose()
  status: string;
}
