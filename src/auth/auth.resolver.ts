import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpInputDto } from './dtos/signup.dto';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthPayload } from './payload/auth.payload';
import { SignInInputDto } from './dtos/signin.dto';
import { ERole } from '@app/common/utils/enums/role.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInputDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthPayload)
  async signIn(
    @Args('signInInput') signInInput: SignInInputDto,
  ): Promise<{ userId: number; role: ERole; accessToken: string }> {
    const user = await this.authService.validateUser(signInInput);
    return await this.authService.signIn(user);
  }
}
