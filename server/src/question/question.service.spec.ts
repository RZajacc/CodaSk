import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

const questionModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByQuery: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: getModelToken(Question.name), useValue: questionModel },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
