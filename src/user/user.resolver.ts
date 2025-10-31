import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/create-user.dto';
import { UpdateUserInputDto } from './dtos/update-user.dto';

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

  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInputDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
    return this.userService.removeUser(id);
  }
}
