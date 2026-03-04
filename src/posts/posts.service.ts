import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { user: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  create(title: string, body: string, userId: number): Promise<Post> {
    return this.prisma.post.create({
      data: { title, body, userId },
      include: { user: true },
    });
  }

  update(id: number, title: string, body: string, userId: number): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: { title, body, userId },
      include: { user: true },
    });
  }

  delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
      include: { user: true },
    });
  }
}
