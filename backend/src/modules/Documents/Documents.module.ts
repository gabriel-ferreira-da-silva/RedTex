// src/modules/Documents/Documents.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma.module';

import { DocumentsController } from './Documents.controller';
import { DocumentsRepository } from './Documents.repository';
import { DocumentsService } from './Documents.service';
import { OpenAIResponsesModule } from '../OpenAIResponses/OpenAIResponses.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => OpenAIResponsesModule), 
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  exports: [DocumentsService],
})
export class DocumentsModule {}
