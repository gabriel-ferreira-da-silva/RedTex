import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/CreateUsers.dto';
import { JwtAuthGuard } from '../Auth/guard/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  create(@Body() body: CreateUserDto ) {
    return this.usersService.createUser(body);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/username/:username')
  findByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }

}
