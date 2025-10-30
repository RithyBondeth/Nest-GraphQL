import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);

  @Query(() => [UserEntity], { name: 'users' })
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Query(() => UserEntity)
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ResolveField('profile')
  async profile(@Parent() user: UserEntity) {
    this.logger.debug(`Fetching profile for user ${user.id}`);
    return await user.profile;
  }
}
