import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { FindByQueryResponseDto } from './dto/findByQueryResponse.dto';
import { plainToInstance } from 'class-transformer';
import { FindByIdResponseDto } from './dto/findByIdResponse.dto';
import { AccessTokenGuard } from '../auth/guards/access-token-guard';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // @Post()
  // create(@Body() createQuestionDto: CreateQuestionDto) {
  //   return this.questionService.create(createQuestionDto);
  // }

  @Get()
  // Swagger
  @ApiOperation({
    summary: 'Get all questions',
    description: 'Get all questions without populating any fields',
  })
  @ApiOkResponse({
    type: Question,
    isArray: true,
  })
  findAll() {
    return this.questionService.findAll();
  }

  @Get('findByQuery')
  // Swagger
  @ApiOperation({
    summary: 'Get all questions by selected query',
    description: 'Get all questions with some data being populated',
  })
  @ApiQuery({
    name: 'filter',
    required: true,
    enum: ['All', 'Popular', 'Unanswered', 'Oldest', 'Solved'],
    description: 'Query options',
  })
  @ApiOkResponse({
    type: FindByQueryResponseDto,
    isArray: true,
  })
  async findByQuery(@Query('filter') filter: string) {
    return this.questionService.findByQuery(filter);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  // Swagger
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get question by its ID',
    description:
      'Get a single question by id with populated values. Returns 404 if no question with this id exists.',
  })
  @ApiOkResponse({
    type: FindByIdResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'No question with provided id was found.',
    example: { statusCode: 404, error: 'Question not found' },
  })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.questionService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  // ) {
  //   return this.questionService.update(+id, updateQuestionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questionService.remove(+id);
  // }
}
