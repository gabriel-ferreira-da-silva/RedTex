import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'database/prisma.module';
import { UsersModule } from './modules/Users/Users.module';
import { DocumentsModule } from './modules/Documents/Documents.module';
import { OpenAIResponsesModule } from './modules/OpenAIResponses/OpenAIResponses.module';
import { AuthModule } from './modules/Auth/Auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    DocumentsModule,
    OpenAIResponsesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
