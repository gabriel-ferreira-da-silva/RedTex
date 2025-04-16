
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DocumentsService } from './Documents.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
@Controller('documents')

export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Post()
  create(@Body() body: CreateDocumentDto ) {
    return this.documentsService.createUser(body);
  }

  @Get("/:documentId")
  findById(@Param("documentId") documentId: string) {
    return this.documentsService.findById(documentId);
  }
  
  @Get("/byUser/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.documentsService.findByUserId(userId);
  }
  
}
