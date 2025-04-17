// src/modules/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.users.findMany();
  }

  getByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });
  }

  create(data: any) {
    return this.prisma.users.create({ data });
  }
}
