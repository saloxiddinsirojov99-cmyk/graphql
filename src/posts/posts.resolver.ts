import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import type { FileUpload } from 'graphql-upload/processRequest.mjs';
import { createWriteStream, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  private async saveFile(file: Promise<FileUpload>): Promise<string> {
    const upload = await file;
    const uploadDir = join(process.cwd(), 'uploads');
    mkdirSync(uploadDir, { recursive: true });

    const fileExt = extname(upload.filename);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    const filePath = join(uploadDir, fileName);

    await pipeline(upload.createReadStream(), createWriteStream(filePath));
    return `/uploads/${fileName}`;
  }

  @Query(() => [Post], { name: 'getAllPosts' })
  getAllPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'getOnePost' })
  getOnePost(@Args('id', { type: () => Int }) id: number): Promise<Post | null> {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('title') title: string,
    @Args('body') body: string,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>,
  ): Promise<Post> {
    return this.saveFile(file).then((filePath) =>
      this.postsService.create(title, body, userId, filePath),
    );
  }

  @Mutation(() => Post)
  async putPost(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('body') body: string,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file?: Promise<FileUpload>,
  ): Promise<Post> {
    let filePath: string | undefined;
    if (file) {
      filePath = await this.saveFile(file);
    }
    return this.postsService.update(id, title, body, userId, filePath);
  }

  @Mutation(() => String)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<string> {
    await this.postsService.delete(id);
    return 'Post successfully deleted';
  }
}
