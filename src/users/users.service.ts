import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { posts: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  create(name: string, age: number): Promise<User> {
    return this.prisma.user.create({
      data: { name, age },
      include: { posts: true },
    });
  }

  update(id: number, name: string, age: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { name, age },
      include: { posts: true },
    });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true },
    });
  }
}
