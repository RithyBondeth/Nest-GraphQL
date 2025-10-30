import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'users' })
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
