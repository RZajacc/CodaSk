import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PopulatedAuthorDto } from './populatedDTO/populated-author.dto';
import { PopulatedTagDto } from './populatedDTO/populated-tag.dto';
import { Question } from '../entities/question.entity';

export class FindByQueryResponseDto extends OmitType(Question, [
  'author',
  'tags',
] as const) {
  @ApiProperty({ type: PopulatedAuthorDto })
  author: PopulatedAuthorDto;

  @ApiProperty({ type: PopulatedTagDto, isArray: true })
  tags: PopulatedTagDto[];
}
