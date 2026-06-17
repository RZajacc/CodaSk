import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PopulatedAuthorDto {
  @ApiProperty({ example: '656b4777d89e223b1e928c33' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Bob' })
  first_name: string;

  @ApiProperty({ example: 'photoURL' })
  user_photo: string;
}
