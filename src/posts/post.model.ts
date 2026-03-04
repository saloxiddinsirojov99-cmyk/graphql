import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => Int)
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User;
}
