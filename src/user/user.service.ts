import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dtos/create-user.dto';
import { UpdateUserInputDto } from './dtos/update-user.dto';
import { Logger } from 'nestjs-pino';
import { ResponseMessage } from '@app/common/utils/constants/response-message.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        relations: ['profile', 'posts'],
      });
      if (!users) throw new NotFoundException(ResponseMessage.NOT_FOUND);

      return users;
    } catch (error) {
      this.logger.error(
        ResponseMessage.FAILED_RETRIEVED_DATA,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_RETRIEVED_DATA,
      );
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });
      return user;
    } catch (error) {
      this.logger.error(
        ResponseMessage.FAILED_RETRIEVED_DATA,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_RETRIEVED_DATA,
      );
    }
  }

  async createUser(createUserInput: CreateUserInputDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(createUserInput);
      await this.userRepository.save(newUser);

      return newUser
    } catch (error) {
      this.logger.error(
        ResponseMessage.FAILED_CREATED_DATA,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_CREATED_DATA,
      );
    }
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInputDto,
  ): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });
      const merged = this.userRepository.merge(user, updateUserInput);
      return await this.userRepository.save(merged);
    } catch (error) {
      this.logger.error(
        ResponseMessage.FAILED_UPDATE_DATA,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_UPDATE_DATA,
      );
    }
  }

  async removeUser(id: number): Promise<Boolean> {
    try {
      const result = await this.userRepository.delete(id);
      return result.affected === 1;
    } catch (error) {
      this.logger.error(
        ResponseMessage.FAILED_DELETED_DATA,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_DELETED_DATA,
      );
    }
  }
}
