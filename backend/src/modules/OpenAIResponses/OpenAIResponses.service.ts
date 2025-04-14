import { Injectable } from '@nestjs/common';
import { OpenAIResponsesRepository } from './OpenAIResponses.repository';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';
import { OpenAIRequestDto } from './dto/OpenAIRequest.dto';
import { CreateOpenAIResponseDto } from './dto/CreateOpenAIResponse.dto';

import { InferenceClient } from '@huggingface/inference';


@Injectable()
export class OpenAIResponsesService {
  private openai: OpenAI;
 
  constructor(private readonly openAIResponseRepo: OpenAIResponsesRepository) {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  /*
  async analyze(dto: OpenAIRequestDto): Promise<OpenAIResponseDto> {
    
    const buffer = Buffer.from(dto.body as string, 'base64');
    const extractedText = await this.extractTextFromPdf(buffer);
    console.log(extractedText)
    const response = await this.openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: 'user',
          content: `Summarize and analyze this text, providing insights and relevant commentary:\n\n${extractedText}`,
        },
      ],
    });

    const openAIResponse = new CreateOpenAIResponseDto();

    openAIResponse.body = response.choices[0].message?.content || '';
    openAIResponse.documentId = dto.documentId;

    return this.createOpenAIResponse(openAIResponse)
  }
  */

  
async analyze(dto) {
  const buffer = Buffer.from(dto.body, 'base64');
  const extractedText = await this.extractTextFromPdf(buffer);
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

  createOpenAIResponse(dto: CreateOpenAIResponseDto): Promise<OpenAIResponseDto>{
    return this.openAIResponseRepo.create(dto);
  }

  async extractTextFromPdf(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text;
  }
  
}
