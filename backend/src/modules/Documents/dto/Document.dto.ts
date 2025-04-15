import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class DocumentDto {
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  name: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  id: string;
  
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
