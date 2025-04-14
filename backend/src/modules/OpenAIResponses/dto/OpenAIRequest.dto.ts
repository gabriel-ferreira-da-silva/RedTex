import { IsNotEmpty, IsOptional, isUUID, IsUUID } from 'class-validator';

export class OpenAIRequestDto {

  @IsOptional()
  @IsUUID()
  documentId: string;

  @IsNotEmpty()
  body: string;

}
