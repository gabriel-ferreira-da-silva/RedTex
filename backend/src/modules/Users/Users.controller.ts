
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/CreateUsers.dto';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto ) {
    return this.usersService.createUser(body);
  }
}
