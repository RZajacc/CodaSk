import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    // return this.userModel.findOne({ email: 'rafal@codac.com' });
    return this.userModel.find().select('-password').lean().exec();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .populate([
        { path: 'questions' },
        { path: 'answers' },
        { path: 'saved_tags' },
      ])
      .lean()
      .exec();
  }

  findOne(id: string): Promise<User | null> {
    return this.userModel
      .findOne({ _id: id })
      .populate([
        { path: 'questions' },
        { path: 'answers' },
        { path: 'saved_tags' },
      ])
      .lean()
      .exec();
  }

  async register(registerUserDto: RegisterUserDto) {
    const userExist = await this.findByEmail(registerUserDto.email);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(registerUserDto.password, salt);

    const user = new this.userModel({
      ...registerUserDto,
      user_photo:
        'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png',
      password: hash,
      member_since: new Date(),
    });
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!removedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
