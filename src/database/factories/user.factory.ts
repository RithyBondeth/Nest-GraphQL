import { faker } from '@faker-js/faker';
import { UserEntity } from '../entities/user.entity';

export class UserFactory {
  static create(overrides?: Partial<UserEntity>): Partial<UserEntity> {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      ...overrides,
    };
  }

  static createMany(count: number): Partial<UserEntity>[] {
    return Array.from({ length: count }, () => this.create());
  }
}