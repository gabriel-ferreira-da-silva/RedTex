// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from './Documents.repository';
import { CreateDocumentDto } from './dto/CreateDocument.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepo: DocumentsRepository) {}

  findAll() {
    return this.documentsRepo.getAll();
  }

  createUser(dto: CreateDocumentDto) {
    dto.body = Buffer.from(dto.body as any, 'base64');  
    return this.documentsRepo.create(dto);
  }
}
