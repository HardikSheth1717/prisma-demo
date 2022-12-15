import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInput
        });
    }

    async getUsers(params: {
        skip?: number,
        take?: number,
        cursor?: Prisma.UserWhereUniqueInput,
        where?: Prisma.UserWhereInput,
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prismaService.user.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({ data });
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    }): Promise<User> {
        const { where, data } = params;
        return this.prismaService.user.update({
            data,
            where
        });
    }

    async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where
        });
    }
}