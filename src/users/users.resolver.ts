import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'getAll' })
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getOne' })
  getOne(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create(name, age);
  }

  @Mutation(() => String)
  async putUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
  ): Promise<string> {
    await this.usersService.update(id, name, age);
    return `User ${id} updated`;
  }

  @Mutation(() => String)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<string> {
    await this.usersService.delete(id);
    return `User successfully deleted`;
  }
}
