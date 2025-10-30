import { faker } from '@faker-js/faker';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileFactory {
  static create(overrides?: Partial<ProfileEntity>): Partial<ProfileEntity> {
    return {
      bio: faker.person.bio(),
      avatar: faker.image.avatar(),
      ...overrides,
    };
  }

  static createMany(count: number): Partial<ProfileEntity>[] {
    return Array.from({ length: count }, () => this.create());
  }
}