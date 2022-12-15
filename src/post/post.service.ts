import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) { }

    async getPost(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
        return this.prismaService.post.findUnique({
            where
        });
    }

    async getPosts(params: {
        skip?: number,
        take?: number,
        where?: Prisma.PostWhereInput,
        cursor?: Prisma.PostWhereUniqueInput,
        orderBy?: Prisma.PostOrderByWithRelationInput
    }): Promise<Post[]> {
        const { skip, take, where, cursor, orderBy } = params;

        return this.prismaService.post.findMany({
            skip,
            take,
            where,
            cursor,
            orderBy
        });
    }

    async create(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prismaService.post.create({ 
            data
         });
    }

    async update(params: {
        where: Prisma.PostWhereUniqueInput,
        data: Prisma.PostUpdateInput
    }): Promise<Post> {
        const { data, where } = params;

        return this.prismaService.post.update({
            data,
            where
        });
    }

    async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prismaService.post.delete({
            where
        })
    }
}