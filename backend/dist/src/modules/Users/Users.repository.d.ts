import { PrismaService } from 'database/prisma.service';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }[]>;
    create(data: any): import(".prisma/client").Prisma.Prisma__UsersClient<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
