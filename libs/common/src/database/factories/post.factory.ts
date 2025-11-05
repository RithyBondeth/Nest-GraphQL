import { faker } from '@faker-js/faker';
import { PostEntity } from '../entities/post.entity';

export class PostFactory {
  static create(overrides?: Partial<PostEntity>): Partial<PostEntity> {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      ...overrides,
    };
  }

  static createMany(count: number): Partial<PostEntity>[] {
    return Array.from({ length: count }, () => this.create());
  }
}
