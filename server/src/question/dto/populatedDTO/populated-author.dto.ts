import { PickType } from '@nestjs/swagger';
import { User } from '../../../user/entities/user.entity';

export class PopulatedAuthorDto extends PickType(User, [
  '_id',
  'first_name',
  'user_photo',
] as const) {}
