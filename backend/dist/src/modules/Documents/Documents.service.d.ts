import { DocumentsRepository } from './Documents.repository';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
export declare class DocumentsService {
    private readonly documentsRepo;
    constructor(documentsRepo: DocumentsRepository);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        body: Uint8Array;
        description: string | null;
        name: string | null;
        userId: string;
        responseId: string | null;
        extension: string | null;
        createdAt: Date;
    }[]>;
    createUser(dto: CreateDocumentDto): import(".prisma/client").Prisma.Prisma__DocumentsClient<{
        id: string;
        body: Uint8Array;
        description: string | null;
        name: string | null;
        userId: string;
        responseId: string | null;
        extension: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
