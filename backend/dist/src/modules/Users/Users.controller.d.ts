import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/CreateUsers.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }[]>;
    create(body: CreateUserDto): import(".prisma/client").Prisma.Prisma__UsersClient<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
