import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

const exec = jest.fn();
const lean = jest.fn(() => ({ exec }));
const populate = jest.fn(() => ({ lean }));

const questionModel = {
  find: jest.fn(),
  findById: jest.fn(() => ({ populate })),
};

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    jest.clearAllMocks();

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

  describe('findOne', () => {
    const validId = '656b4777d89e223b1e928c33';
    const question = { _id: validId, title: 'How do I test Nest services?' };

    it('returns the question for an existing id', async () => {
      exec.mockResolvedValue(question);

      await expect(service.findOne(validId)).resolves.toEqual(question);
      expect(questionModel.findById).toHaveBeenCalledWith(validId);
      expect(populate).toHaveBeenCalledTimes(1);
    });

    it('throws for an id that does not exist', async () => {
      exec.mockResolvedValue(null);

      await expect(service.findOne('656b4777d89e223b1e928c99')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
