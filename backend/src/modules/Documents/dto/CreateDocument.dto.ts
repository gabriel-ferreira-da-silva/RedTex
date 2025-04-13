import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  name: string;

  @IsUUID()
  userId: string;
  
  @IsOptional()
  @IsUUID()
  responseId?: string;

  @IsNotEmpty()
  body: Buffer;

  @IsOptional()
  createdAt?: Date;

  @IsNotEmpty()
  extension: string;
}
