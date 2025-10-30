import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';

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

  async createUser(createUserInput: CreateUserInput) {
    const newUser = await this.userRepository.create(createUserInput);
    await this.userRepository.save(newUser);

    return newUser;
  }
}
