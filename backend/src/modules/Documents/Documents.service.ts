import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from './Documents.repository';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { OpenAIResponsesService } from '../OpenAIResponses/OpenAIResponses.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepo: DocumentsRepository,
    private readonly openAIResponseService: OpenAIResponsesService,
  ) {}

  findAll() {
    return this.documentsRepo.getAll();
  }


  createUser(dto: CreateDocumentDto) {
    dto.body = Buffer.from(dto.body as any, 'base64');  
    return this.documentsRepo.create(dto);
  }

  async findById(documentId:string){
    const documentDTO = await this.documentsRepo.getById(documentId);
    const openAIResponse = await this.openAIResponseService.getByDocumentId(documentId);
    
    return {
      documentDTO:documentDTO,
      response:openAIResponse
    }
  }


  findByUserId(UserId:string){
    return  this.documentsRepo.getByUserId(UserId);  
  }
}
