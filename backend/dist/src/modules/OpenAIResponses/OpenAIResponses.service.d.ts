import { OpenAIResponsesRepository } from './OpenAIResponses.repository';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import { CreateOpenAIResponseDto } from './dto/CreateOpenAIResponse.dto';
export declare class OpenAIResponsesService {
    private readonly openAIResponseRepo;
    private openai;
    constructor(openAIResponseRepo: OpenAIResponsesRepository);
    analyze(dto: any): Promise<OpenAIResponseDto>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        body: string;
        documentId: string;
        createdAt: Date;
    }[]>;
    createOpenAIResponse(dto: CreateOpenAIResponseDto): Promise<OpenAIResponseDto>;
    extractTextFromPdf(buffer: Buffer): Promise<string>;
}
