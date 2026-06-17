import { FindByQueryResponseDto } from './findByQueryResponse.dto';
import { PopulatedAnswerDto } from './populatedDTO/populated-answer.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class FindByIdResponseDto extends OmitType(FindByQueryResponseDto, [
  'answers',
] as const) {
  @ApiProperty({ type: PopulatedAnswerDto, isArray: true })
  answers: PopulatedAnswerDto[];
}
