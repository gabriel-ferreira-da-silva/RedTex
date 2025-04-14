import { Injectable } from '@nestjs/common';
import { UsersRepository } from './Users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/CreateUsers.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll() {
    return this.usersRepo.getAll();
  }

  async createUser(dto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

    dto.password = hashedPassword;
  
    return this.usersRepo.create(dto);
  }


  findByUsername(username: string){
    return this.usersRepo.getByUsername(username);
  }
}
