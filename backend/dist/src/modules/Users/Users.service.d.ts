import { UsersRepository } from './Users.repository';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: UsersRepository);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }[]>;
    createUser(data: any): import(".prisma/client").Prisma.Prisma__UsersClient<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
