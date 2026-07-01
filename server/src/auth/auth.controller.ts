import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService, SafeUser } from './auth.service';
import { AccessTokenGuard } from './guards/access-token-guard';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
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
  async login(
    @Req() req: Request & { user: SafeUser },
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const { tokens, user } = await this.authService.login(req.user);

    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return user;
  }

  @Post('register')
  // Swagger
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user with full user credentials',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    example: 'Registered successfully user with email: Jonh@email.com',
  })
  @ApiBadRequestResponse({
    description: 'Failed due to validation error',
    example: {
      statusCode: 400,
      error: 'Bad Request',
      message: ['Password must be longer than or equal to 8 characters'],
    },
  })
  @ApiConflictResponse({
    description: 'Failed because user already exists',
    example: {
      statusCode: 409,
      message: 'User already exists',
    },
  })
  async register(@Body() registerUserDTO: RegisterUserDto) {
    const registeredUser = await this.authService.register(registerUserDTO);

    return `Registered successfully user with email: ${registeredUser.email}`;
  }

  @UseGuards(AccessTokenGuard)
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
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const userId = req.user['_id'] as string;

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return await this.authService.logout(userId);
  }

  @UseGuards(AccessTokenGuard)
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
