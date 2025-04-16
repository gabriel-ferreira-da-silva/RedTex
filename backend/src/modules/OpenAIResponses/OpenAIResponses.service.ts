import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OpenAIResponsesRepository } from './OpenAIResponses.repository';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';
import { OpenAIRequestDto } from './dto/OpenAIRequest.dto';
import { CreateOpenAIResponseDto } from './dto/CreateOpenAIResponse.dto';
import { DocumentsService } from '../Documents/Documents.service';
import { InferenceClient } from '@huggingface/inference';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const Tesseract = require('tesseract.js');

@Injectable()
export class OpenAIResponsesService {
  private openai: OpenAI;
  private visionClient: ImageAnnotatorClient;
 
  constructor(
    private readonly openAIResponseRepo: OpenAIResponsesRepository,
    @Inject(forwardRef(() => DocumentsService))
    private readonly documentsService: DocumentsService,
  ) {
    this.visionClient = new ImageAnnotatorClient();
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async analyze(dto: OpenAIRequestDto) {
    let extractedText = '';

    if (dto.extension == 'pdf') {
      extractedText = await this.extractTextFromPdf(dto.body);
    } else {
      console.log(dto.body)
      extractedText = await this.extractTextFromImage(dto.body);
      console.log(extractedText)
    }

    const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

    const response = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
          {
              role: "user",
              content: `descreva de forma sucinta o seguinte texto:\n\n${extractedText}`,
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


  async extractTextFromImage(imageBuffer) {
    try {
      const { data: { text } } = await Tesseract.recognize(
        imageBuffer,
        'eng', // Language code (e.g., 'eng' for English)
        {
          logger: (m) => console.log(m), // Optional: logs OCR progress
        }
      );
      return text;
    } catch (error) {
      console.error('OCR Error:', error);
      return '';
    }
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
    openAIRequest.extension = documentDTO.extension ? documentDTO.extension : "pdf";
  
    return this.analyze(openAIRequest);
  }
  
}
