import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PopulatedAuthorDto } from './populated-author.dto';
import { Answer } from '../../../answer/entities/answer.entity';

export class PopulatedAnswerDto extends OmitType(Answer, [
  'question',
  'author',
] as const) {
  @ApiProperty({ type: PopulatedAuthorDto })
  author: PopulatedAuthorDto;
}
