import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService, SafeUser } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

import { LoginResponseDTO } from './dto/login-response-dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  // Swagger
  @ApiOperation({
    summary: 'Login user',
    description:
      'Logs in the user. Returns access token in response body and sets refresh token as HttpOnly cookie.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    example: { statusCode: 401, error: 'Unauthorized' },
  })
  login(@Req() req: Request & { user: SafeUser }) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDto) {
    return registerUserDTO;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
    description: 'Logging out user',
    // description: 'It will remove refresh token from the user',
  })
  @ApiOkResponse({
    description: 'Logging out was successful',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    example: { statusCode: 401, error: 'Unauthorized' },
  })
  logout(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return 'Loggging out...';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // Swagger
  @ApiOperation({
    summary: 'Get users profile',
    description: 'Get user profile based on JWT token',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: { statusCode: 401, error: 'Unauthorized' },
  })
  @ApiOkResponse({
    description: 'Get user profile',
    type: UserResponseDto,
  })
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
