import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../auth/guards/access-token-guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users without populating any fields',
  })
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user by its id',
    description: 'Get a single user by id with populated values',
  })
  @ApiOkResponse({
    type: UserResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id (id must be a valid positive integer)',
  })
  @ApiOkResponse({
    description: 'Updated user details.',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'No user with provided id was found.',
    example: { statusCode: 404, error: 'User not found' },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: { statusCode: 401, error: 'Unauthorized' },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Delete user by id (id must be a valid positive integer)',
  })
  @ApiNoContentResponse({
    description: 'User was successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'No user with provided id was found.',
    example: { statusCode: 404, error: 'User not found' },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: { statusCode: 401, error: 'Unauthorized' },
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
