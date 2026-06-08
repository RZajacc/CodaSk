import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class PopulatedAuthorDto {
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  @Expose()
  _id: string;

  @ApiProperty({ example: 'Bob' })
  @Expose()
  first_name: string;

  @ApiProperty({ example: 'photoURL' })
  @Expose()
  user_photo: string;
}
