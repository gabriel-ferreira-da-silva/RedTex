import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma.module';

import { DocumentsController } from './Documents.controller';
import { DocumentsRepository } from './Documents.repository';
import { DocumentsService } from './Documents.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  exports:[DocumentsService]
})
export class DocumentsModule {}
