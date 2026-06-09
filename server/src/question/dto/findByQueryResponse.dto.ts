import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { PopulatedAuthorDto } from './populated-author.dto';
import { PopulatedTagDto } from './populated-tag.dto';

export class FindByQueryResponseDto {
  @ApiProperty({ example: '658164f13468b3af52b44ff1' })
  _id: Types.ObjectId;

  @ApiProperty({ type: PopulatedAuthorDto })
  author: PopulatedAuthorDto;

  @ApiProperty({ example: '2023-12-19T09:40:01.839+00:00' })
  posted_on: Date;

  @ApiProperty({ example: 'Dont know how to center a div' })
  title: string;

  @ApiProperty({
    example: 'It renders on top left and i cannot move it to the middle',
  })
  problem_description: string;

  @ApiProperty({ example: 'I tried asking ChatGPT, he doesnt know either' })
  solution_tried: string;

  @ApiProperty({ example: 'MODULE 3' })
  module: string;

  @ApiProperty({ example: 'myrepo.github' })
  github_repo: string;

  @ApiProperty({ type: PopulatedTagDto, isArray: true })
  tags: PopulatedTagDto[];

  @ApiProperty({ example: ['65816d209fe28bb962481f28'] })
  answers: string[];

  @ApiProperty({ example: 1 })
  answersCount: number;

  @ApiProperty({ example: [] })
  saved_by: string[];

  @ApiProperty({ example: 'solved' })
  status: string;
}
