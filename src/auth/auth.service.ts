import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpInputDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { ERole } from 'utils/enums/role.enum';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
}
