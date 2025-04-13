import { PrismaService } from 'database/prisma.service';
export declare class DocumentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string | null;
        createdAt: Date;
        body: Uint8Array;
        description: string | null;
        userId: string;
        responseId: string | null;
        extension: string | null;
    }[]>;
    create(data: any): import(".prisma/client").Prisma.Prisma__DocumentsClient<{
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
