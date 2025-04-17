import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.documents.findMany();
  }

  getById(documentId: string){
    return this.prisma.documents.findUnique({
      where:{
        id: documentId,
      },
      include: {
        responses: true,
      },
    })
  }
  

  async getByUserId(userId: string) {
    return this.prisma.documents.findMany({
      where: {
        userId: userId,
      },
      include: {
        responses: true,
      },
    });
  }
  
  
  create(data: any) {
    return this.prisma.documents.create({ data });
  }
}
