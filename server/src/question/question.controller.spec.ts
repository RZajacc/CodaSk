import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

describe('QuestionController', () => {
  let controller: QuestionController;
  const exec = jest.fn();
  const lean = jest.fn(() => ({ exec }));
  const populate = jest.fn(() => ({ lean }));

  const questionModel = {
    findById: jest.fn(() => ({ populate })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        QuestionService,
        { provide: getModelToken(Question.name), useValue: questionModel },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    const validId = '656b4777d89e223b1e928c33';
    const question = { _id: validId, title: 'How do I test Nest controllers?' };

    it('returns the question for an existing id', async () => {
      exec.mockResolvedValue(question);

      await expect(controller.findOne(validId)).resolves.toEqual(question);
      expect(questionModel.findById).toHaveBeenCalledWith(validId);
      expect(populate).toHaveBeenCalledTimes(1);
    });

    it('throws for an id that does not exist', async () => {
      exec.mockResolvedValue(null);

      await expect(controller.findOne(validId)).rejects.toThrow(
        NotFoundException,
      );
      expect(questionModel.findById).toHaveBeenCalledWith(validId);
    });
  });
});
