import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpInputDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, verify } from 'argon2';
import { Logger } from 'nestjs-pino';
import { SignInInputDto } from './dtos/signin.dto';
import { ERole } from '@app/common/utils/enums/role.enum';
import { ResponseMessage } from '@app/common/utils/constants/response-message.constant';
import { JwtService } from '@app/common/jwt/jwt.service';
import { AuthJwtUser } from '@app/common/utils/interfaces/auth-jwt-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async signUp(signUpInput: SignUpInputDto): Promise<UserEntity> {
    try {
      const hashPassword = await hash(signUpInput.password);
      const newUser = this.userRepository.create({
        ...signUpInput,
        password: hashPassword,
        role: ERole.USER,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(
        'Error Signup',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Failed to signup new user');
    }
  }

  async validateUser(signInInput: SignInInputDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneByOrFail({
      email: signInInput.email,
    });
    const passwordMatched = await verify(user.password, signInInput.password);

    if (!passwordMatched)
      throw new UnauthorizedException(ResponseMessage.INVALID_CREDENTIAL);

    return user;
  }

  async signIn(
    user: UserEntity,
  ): Promise<{ userId: number; role: ERole; accessToken: string }> {
    const accessToken = await this.jwtService.generateToken(user.id);

    return {
      userId: user.id,
      role: user.role,
      accessToken: accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    const jwtUser: AuthJwtUser = {
      userId: user.id,
      role: user.role,
    };
    return jwtUser;
  }
}
