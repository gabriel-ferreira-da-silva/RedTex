import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { DocumentDto } from './dto/Document.dto';

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
    })
  }
  
  create(data: any) {
    return this.prisma.documents.create({ data });
  }
}
