import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateOpenAIResponseDto {

  @IsOptional()
  @IsUUID()
  documentId: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  createdAt?: Date;
}
