import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'getAllPosts' })
  getAllPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'getOnePost', nullable: true })
  getOnePost(@Args('id', { type: () => Int }) id: number): Promise<Post | null> {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('title') title: string,
    @Args('body') body: string,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Post> {
    return this.postsService.create(title, body, userId);
  }

  @Mutation(() => Post)
  putPost(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('body') body: string,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Post> {
    return this.postsService.update(id, title, body, userId);
  }

  @Mutation(() => String)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<string> {
    await this.postsService.delete(id);
    return 'Post successfully deleted';
  }
}
