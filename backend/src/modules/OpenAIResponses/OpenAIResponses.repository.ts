import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class OpenAIResponsesRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.openAIResponses.findMany();
  }

  create(data: any) {
    return this.prisma.openAIResponses.create({ data });
  }
}
