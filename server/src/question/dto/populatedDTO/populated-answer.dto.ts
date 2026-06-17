import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PopulatedAuthorDto } from './populated-author.dto';

export class PopulatedAnswerDto {
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'I fixed it with...' })
  message: string;

  @ApiProperty({ example: '2023-12-19T10:14:56.217+00:00' })
  posted_on: Date;

  @ApiProperty({ example: ['656b4777d89e223b1e928c33'] })
  votes: string[];

  @ApiProperty({ type: PopulatedAuthorDto })
  author: PopulatedAuthorDto;
}
