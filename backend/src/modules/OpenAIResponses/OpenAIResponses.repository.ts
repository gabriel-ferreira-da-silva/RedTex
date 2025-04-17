import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpenAIResponsesRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.openAIResponses.findMany();
  }

  findByDocumentId(documentId:string){
    return this.prisma.openAIResponses.findFirst({
      where:{
        documentId:documentId,
      }
    });
  }

  create(data: any) {
    return this.prisma.openAIResponses.create({ data });
  }
}
