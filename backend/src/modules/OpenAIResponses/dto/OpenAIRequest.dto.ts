import { IsNotEmpty, IsOptional, isUUID, IsUUID } from 'class-validator';

export class OpenAIRequestDto {

  @IsNotEmpty()
  @IsUUID()
  documentId: string;

  @IsNotEmpty()
  body: Buffer;

  @IsNotEmpty()
  extension: string;

}
