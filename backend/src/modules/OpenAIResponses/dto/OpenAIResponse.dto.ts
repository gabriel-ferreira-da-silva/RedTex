import { IsNotEmpty, IsOptional,  IsUUID } from 'class-validator';

export class OpenAIResponseDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  documentId: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  createdAt?: Date;

}
