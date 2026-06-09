import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PopulatedTagDto {
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Javascript' })
  name: string;
}
