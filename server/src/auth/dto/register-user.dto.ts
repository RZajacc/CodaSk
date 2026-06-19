import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the RegisterUserDto schema' })
export class RegisterUserDto {
  @ApiProperty({ example: 'John@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', minimum: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
