import { randomUUID } from 'node:crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Connection, STATES } from 'mongoose';
import { Answer, AnswerSchema } from '../answer/entities/answer.entity';
import { Question, QuestionSchema } from './entities/question.entity';
import { QuestionService } from './question.service';
import { Tag, TagSchema } from '../tag/entities/tag.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { sampleData, sampleIds } from '../../test/fixtures/sample-data';
import { seedSampleData } from '../../test/fixtures/seed-sample-data';

describe('QuestionService.findOne (integration)', () => {
  const databaseName = `codask_it_${randomUUID().replace(/-/g, '')}`;
  let connection: Connection;
  let module: TestingModule | undefined;
  let service: QuestionService;

  async function cleanupDatabase(): Promise<void> {
    if (!connection) {
      return;
    }

    try {
      if (connection.readyState === STATES.connected) {
        if (connection.name !== databaseName) {
          throw new Error('Refusing to drop an unexpected database');
        }
        await connection.dropDatabase();
      }
    } finally {
      await connection.close();
    }
  }

  beforeAll(async () => {
    connection = mongoose.createConnection(
      `mongodb://127.0.0.1:27018/${databaseName}`,
      {
        // A local test service should be ready before the suite starts.
        serverSelectionTimeoutMS: 5000,
      },
    );
    await connection.asPromise();
    const questionModel = connection.model(Question.name, QuestionSchema);
    connection.model(User.name, UserSchema);
    connection.model(Answer.name, AnswerSchema);
    connection.model(Tag.name, TagSchema);
    await seedSampleData(connection);

    module = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: getModelToken(Question.name), useValue: questionModel },
      ],
    }).compile();
    service = module.get(QuestionService);
  });

  afterAll(async () => {
    try {
      await module?.close();
    } finally {
      await cleanupDatabase();
    }
  });

  it('returns the seeded question with its populated relations', async () => {
    const question = await service.findOne(sampleIds.question.toHexString());

    expect(question).toEqual(
      expect.objectContaining({
        _id: sampleIds.question,
        title: sampleData.questions[0].title,
        author: {
          _id: sampleIds.author,
          first_name: sampleData.users[0].first_name,
        },
        tags: [{ _id: sampleIds.tag, name: sampleData.tags[0].name }],
        answers: [
          {
            _id: sampleIds.answer,
            message: sampleData.answers[0].message,
            posted_on: sampleData.answers[0].posted_on,
            votes: [],
            author: {
              _id: sampleIds.answerAuthor,
              first_name: sampleData.users[1].first_name,
            },
          },
        ],
      }),
    );
    expect(Object.getPrototypeOf(question)).toBe(Object.prototype);
  });
});
