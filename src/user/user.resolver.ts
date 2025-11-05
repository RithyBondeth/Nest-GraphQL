import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { UserService } from './user.service';
import { Logger, UseGuards } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/create-user.dto';
import { UpdateUserInputDto } from './dtos/update-user.dto';
import { GqlJwtGuardGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthJwtUser } from '@app/common/utils/interfaces/auth-jwt-user.interface';
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

  @UseGuards(GqlJwtGuardGuard)
  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserInput);
  }

  @UseGuards(GqlJwtGuardGuard)
  @Mutation(() => UserEntity)
  updateUser(
    @Args('updateUserInput')
    updateUserInput: UpdateUserInputDto,
    @Context() context: any,
  ): Promise<UserEntity> {
    const user = context.req.user;
    console.log('User: ', user);
    return this.userService.updateUser(user.id, updateUserInput);
  }

  @UseGuards(GqlJwtGuardGuard)
  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
    return this.userService.removeUser(id);
  }

  @UseGuards(GqlJwtGuardGuard)
  @Query(() => UserEntity)
  async currentUser(@CurrentUser() user: AuthJwtUser): Promise<UserEntity> {
    const currentUserId = user.id;
    return this.userService.findOne(currentUserId);
  }
}
