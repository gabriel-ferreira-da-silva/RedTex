import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma.module';

import { OpenAIResponseController } from './OpenAIResponses.controller';
import { OpenAIResponsesRepository } from './OpenAIResponses.repository';
import { OpenAIResponsesService } from './OpenAIResponses.service';

import { DocumentsModule } from '../Documents/Documents.module';
@Module({
  imports: [PrismaModule, DocumentsModule],
  controllers: [OpenAIResponseController],
  providers: [OpenAIResponsesService, OpenAIResponsesRepository],
})
export class OpenAIResponsesModule {}
