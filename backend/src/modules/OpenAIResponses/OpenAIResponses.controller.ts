
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OpenAIResponsesService } from './OpenAIResponses.service';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import { OpenAIRequestDto } from './dto/OpenAIRequest.dto';


@Controller('openairesponse')

export class OpenAIResponseController {
  constructor(private readonly OpenAIResponsesService: OpenAIResponsesService) {}

  @Get()
  findAll() {
    return this.OpenAIResponsesService.findAll();
  }

  @Post()
  create(@Body() body: OpenAIResponseDto ) {
    return this.OpenAIResponsesService.createOpenAIResponse(body);
  }

  @Post("/analyze")
  analyze(@Body() body: OpenAIRequestDto ): Promise<OpenAIResponseDto>{
    return this.OpenAIResponsesService.analyze(body);
  }
}
