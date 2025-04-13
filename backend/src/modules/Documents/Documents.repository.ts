import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.documents.findMany();
  }

  create(data: any) {
    return this.prisma.documents.create({ data });
  }
}
