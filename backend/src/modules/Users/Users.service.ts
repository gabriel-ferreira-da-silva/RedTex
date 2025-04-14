import { Injectable } from '@nestjs/common';
import { UsersRepository } from './Users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll() {
    return this.usersRepo.getAll();
  }

  createUser(data: any) {
    return this.usersRepo.create(data);
  }
}
