import { OpenAIResponsesService } from './OpenAIResponses.service';
import { OpenAIResponseDto } from './dto/OpenAIResponse.dto';
import { OpenAIRequestDto } from './dto/OpenAIRequest.dto';
export declare class OpenAIResponseController {
    private readonly OpenAIResponsesService;
    constructor(OpenAIResponsesService: OpenAIResponsesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        body: string;
        documentId: string;
    }[]>;
    create(body: OpenAIResponseDto): Promise<OpenAIResponseDto>;
    analyze(body: OpenAIRequestDto): Promise<OpenAIResponseDto>;
}
