import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'database/prisma.module';
import { UsersModule } from './modules/Users/Users.module';
import { DocumentsModule } from './modules/Documents/Documents.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    DocumentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
