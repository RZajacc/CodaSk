import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './user/entities/user.entity';
import { Question, QuestionSchema } from './question/entities/question.entity';
import { Answer, AnswerSchema } from './answer/entities/answer.entity';
import { Tag, TagSchema } from './tag/entities/tag.entity';
import { sampleData, sampleIds } from '../test/fixtures/sample-data';

describe('shared sample data', () => {
  it('satisfies the schemas and contains consistent question relationships', () => {
    const connection = mongoose.createConnection();
    const schemas = {
      users: connection.model(User.name, UserSchema),
      questions: connection.model(Question.name, QuestionSchema),
      answers: connection.model(Answer.name, AnswerSchema),
      tags: connection.model(Tag.name, TagSchema),
    };

    for (const [collection, model] of Object.entries(schemas)) {
      for (const document of sampleData[
        collection as keyof typeof sampleData
      ]) {
        expect(new model(document).validateSync()).toBeUndefined();
      }
    }

    expect(sampleData.questions[0].author).toEqual(sampleIds.author);
    expect(sampleData.questions[0].answers).toEqual([sampleIds.answer]);
    expect(sampleData.questions[0].tags).toEqual([sampleIds.tag]);
    expect(sampleData.answers[0].author).toEqual(sampleIds.answerAuthor);
    expect(sampleData.answers[0].question).toEqual(sampleIds.question);
    expect(sampleData.tags[0].related_questions).toEqual([sampleIds.question]);
  });

  it('does not provide usable passwords for sample users', async () => {
    for (const user of sampleData.users) {
      await expect(bcrypt.compare('any-password', user.password)).resolves.toBe(
        false,
      );
    }
  });
});
