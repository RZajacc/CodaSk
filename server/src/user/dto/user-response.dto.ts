import { User } from '../entities/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Tag } from '../../tag/entities/tag.entity';

export class UserResponseDto extends OmitType(User, [
  'questions',
  'answers',
  'saved_tags',
] as const) {
  @ApiProperty({ type: Question, isArray: true })
  questions: Question[];
  @ApiProperty({ type: Answer, isArray: true })
  answers: Answer[];
  @ApiProperty({ type: Tag, isArray: true })
  saved_tags: Tag[];
}
