import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/CreateUsers.dto';
import { JwtAuthGuard } from '../Auth/guard/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
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
