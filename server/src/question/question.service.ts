import { Injectable } from '@nestjs/common';
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
  private readonly populateFindFields = [
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
          .populate(this.populateFindFields)
          .sort({ posted_on: -1 })
          .lean()
          .exec();
      }
      case 'Popular': {
        return this.questionModel
          .find()
          .populate(this.populateFindFields)
          .sort({ answersCount: -1, posted_on: -1 });
      }
      case 'Unanswered': {
        return this.questionModel
          .find()
          .populate(this.populateFindFields)
          .sort({ answersCount: 1, posted_on: -1 });
      }
      case 'Oldest': {
        return this.questionModel
          .find()
          .populate(this.populateFindFields)
          .sort({ posted_on: 1 })
          .lean()
          .exec();
      }
      case 'Solved': {
        return this.questionModel
          .find()
          .populate(this.populateFindFields)
          .sort({ status: 1 })
          .lean()
          .exec();
      }
    }
  }

  findOne(id: string) {
    return this.questionModel
      .findById(id)
      .populate(this.populateFindFields)
      .lean()
      .exec();
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
