import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../posts/post.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
