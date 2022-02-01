import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.delete(username);
  }
}
