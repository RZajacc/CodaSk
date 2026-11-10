import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { getModelToken } from '@nestjs/mongoose';

// TODO: Implement proper mock for answerModel
const answerModel = {};

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        { provide: getModelToken('Answer'), useValue: answerModel },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
