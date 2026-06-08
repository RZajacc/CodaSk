import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class PopulatedTagDto {
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  @Expose()
  _id: string;

  @ApiProperty({ example: 'Javascript' })
  @Expose()
  name: string;
}
