// user.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver('UserResolver')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Mutation((returns) => User)
  async createUser(@Args('user') user: User): Promise<User> {
    try {
          return this.userService.createUser(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(error)
    }
  }

  @Mutation((returns) => User)
  async updateUser(@Args('id') id: string, @Args('updatedUser') updatedUser: User): Promise<User | null> {
    const [, [user]] = await this.userService.updateUser(id, updatedUser);
    return user;
  }

  @Mutation((returns) => ID)
  async deleteUser(@Args('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
