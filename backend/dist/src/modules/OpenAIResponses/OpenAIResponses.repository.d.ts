import { PrismaService } from 'database/prisma.service';
export declare class OpenAIResponsesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        body: string;
        documentId: string;
    }[]>;
    create(data: any): import(".prisma/client").Prisma.Prisma__OpenAIResponsesClient<{
        id: string;
        createdAt: Date;
        body: string;
        documentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
