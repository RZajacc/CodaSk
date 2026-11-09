import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  // Fields to populate
  private readonly populateFindByQuery = [
    {
      path: 'author',
      select: ['user_photo', 'first_name'],
    },
    {
      path: 'tags',
      select: ['name'],
    },
  ];

  private readonly populateFindById = [
    {
      path: 'author',
      select: ['user_photo', 'first_name'],
    },
    {
      path: 'answers',
      select: 'message votes posted_on author',
      populate: {
        path: 'author',
        select: 'user_photo first_name',
      },
    },
    {
      path: 'tags',
      select: ['name'],
    },
  ];

  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  findAll() {
    return this.questionModel.find().lean().exec();
  }

  async findByQuery(filter: string) {
    switch (filter) {
      case 'All': {
        return this.questionModel
          .find()
          .populate(this.populateFindByQuery)
          .sort({ posted_on: -1 })
          .lean()
          .exec();
      }
      case 'Popular': {
        return this.questionModel
          .find()
          .populate(this.populateFindByQuery)
          .sort({ answersCount: -1, posted_on: -1 })
          .lean()
          .exec();
      }
      case 'Unanswered': {
        return this.questionModel
          .find()
          .populate(this.populateFindByQuery)
          .sort({ answersCount: 1, posted_on: -1 })
          .lean()
          .exec();
      }
      case 'Oldest': {
        return this.questionModel
          .find()
          .populate(this.populateFindByQuery)
          .sort({ posted_on: 1 })
          .lean()
          .exec();
      }
      case 'Solved': {
        return this.questionModel
          .find()
          .populate(this.populateFindByQuery)
          .sort({ status: 1 })
          .lean()
          .exec();
      }
    }
  }

  async findOne(id: string) {
    // Find the question and populate the related author, answers, and tags.
    const question = await this.questionModel
      .findById(id)
      .populate(this.populateFindById)
      .lean()
      .exec();

    // Throw a 404 when no question exists for the provided ID.
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Return the question as a plain object from the lean query.
    return question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
