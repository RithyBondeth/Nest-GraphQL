import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpInputDto } from './dtos/signup.dto';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInputDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(signUpInput);
  }
}
