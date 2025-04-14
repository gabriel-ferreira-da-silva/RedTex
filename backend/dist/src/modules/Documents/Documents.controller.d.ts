import { DocumentsService } from './Documents.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string | null;
        createdAt: Date;
        body: Uint8Array;
        description: string | null;
        userId: string;
        responseId: string | null;
        extension: string | null;
    }[]>;
    create(body: CreateDocumentDto): import(".prisma/client").Prisma.Prisma__DocumentsClient<{
        id: string;
        name: string | null;
        createdAt: Date;
        body: Uint8Array;
        description: string | null;
        userId: string;
        responseId: string | null;
        extension: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
