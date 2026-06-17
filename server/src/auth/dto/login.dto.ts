import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: '1234567890' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
