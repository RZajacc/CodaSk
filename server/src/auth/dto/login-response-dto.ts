import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { UserResponseDto } from '../../user/dto/user-response-dto';

@ApiSchema({
  description: 'Description of the object returned on successfully login',
})
export class LoginResponseDTO {
  @ApiProperty({ description: 'JWT String', example: '<JWT_ACCESS_TOKEN>' })
  accessToken: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
