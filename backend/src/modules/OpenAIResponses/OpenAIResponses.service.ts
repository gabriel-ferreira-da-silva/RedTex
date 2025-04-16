import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OpenAIResponsesRepository } from './OpenAIResponses.repository';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';
import { OpenAIRequestDto } from './dto/OpenAIRequest.dto';
import { CreateOpenAIResponseDto } from './dto/CreateOpenAIResponse.dto';
import { DocumentsService } from '../Documents/Documents.service';

import { InferenceClient } from '@huggingface/inference';


@Injectable()
export class OpenAIResponsesService {
  private openai: OpenAI;
 
  constructor(
    private readonly openAIResponseRepo: OpenAIResponsesRepository,
    @Inject(forwardRef(() => DocumentsService))
    private readonly documentsService: DocumentsService,
  ) {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async analyze(dto: OpenAIRequestDto) {
  const extractedText = await this.extractTextFromPdf(dto.body);
  //const extractedText = await this.extractTextFromPdf(buffer);
  console.log(extractedText);

  const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

  const response = await client.chatCompletion({
    provider: "novita",
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
        {
            role: "user",
            content: `descreva de forma sucinta o seguinte texto retirado de um pdf fornecendo uma analise breve e relevante:\n\n${extractedText}`,
        },
    ],
});

  const openAIResponse = new CreateOpenAIResponseDto();

  openAIResponse.body = response.choices[0].message.content || '';
  openAIResponse.documentId = dto.documentId;

  return this.createOpenAIResponse(openAIResponse)

}


  findAll() {
    return this.openAIResponseRepo.getAll();
  }

  getByDocumentId(documentId: string){
    return this.openAIResponseRepo.findByDocumentId(documentId);
  }

  createOpenAIResponse(dto: CreateOpenAIResponseDto): Promise<OpenAIResponseDto>{
    return this.openAIResponseRepo.create(dto);
  }

  async extractTextFromPdf(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text;
  }

  async analyzeFromDocumentId(documentId: string): Promise<OpenAIResponseDto> {
    const document = await this.documentsService.findById(documentId);
    
    const { documentDTO } = document;
  
    if (!documentDTO) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
  
    const openAIRequest = new OpenAIRequestDto();
    openAIRequest.body = Buffer.from(documentDTO.body);
    openAIRequest.documentId = documentDTO.id;
  
    return this.analyze(openAIRequest);
  }
  
  
}
