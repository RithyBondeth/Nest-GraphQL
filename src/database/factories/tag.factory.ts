import { faker } from '@faker-js/faker';
import { TagEntity } from '../entities/tag.entity';

export class TagFactory {
  static create(overrides?: Partial<TagEntity>): Partial<TagEntity> {
    return {
      name: faker.word.noun(),
      ...overrides,
    };
  }

  static createMany(count: number): Partial<TagEntity>[] {
    return Array.from({ length: count }, () => this.create());
  }
}