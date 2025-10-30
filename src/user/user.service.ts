import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['profile', 'posts'],
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserInput);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneByOrFail({ id });
    return await this.userRepository.save(
      new UserEntity(Object.assign(user, updateUserInput)),
    );
  }

  async removeUser(id: number) {
    const result = await this.userRepository.delete(id);
    return result.affected === 1;
  }
}
