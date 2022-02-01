import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

import { generateNamePrefix } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    await user.save();
    let createdUser = await this.userModel
      .findById(user._id)
      .select(['-_id', '-__v'])
      .exec();

    const namePrefix = generateNamePrefix(createdUser);
    createdUser = JSON.parse(JSON.stringify(createdUser));
    createdUser.name_prefix = namePrefix;

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select(['-_id', '-__v']).exec();

    const foundUsers = users.map((user) => {
      const namePrefix = generateNamePrefix(user);
      user = JSON.parse(JSON.stringify(user));
      user.name_prefix = namePrefix;
      return user;
    });

    return foundUsers;
  }

  async delete(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    await user.remove();
    return { message: 'You deleted the user successfully.' };
  }
}
