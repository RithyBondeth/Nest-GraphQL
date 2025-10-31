import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserFactory } from '../factories/user.factory';
import { PostFactory } from '../factories/post.factory';
import { TagFactory } from '../factories/tag.factory';
import { ProfileFactory } from '../factories/profile.factory';
import { UserEntity } from '../entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { TagEntity } from '../entities/tag.entity';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class DatabaseSeeder {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async seed() {
    this.logger.log('Starting database seeding...');

    await this.clear();

    this.logger.log('Seeding tags...');
    const tags = await this.seedTags(10);

    this.logger.log('Seeding users and profiles...');
    const users = await this.seedUsers(20);

    this.logger.log('Seeding posts...');
    await this.seedPosts(50, users, tags);

    this.logger.log('Database seeding completed successfully!');
  }

  private async seedTags(count: number): Promise<TagEntity[]> {
    const tags: TagEntity[] = [];

    for (let i = 0; i < count; i++) {
      const tagData = TagFactory.create();
      const tag = this.tagRepository.create(tagData);
      tags.push(await this.tagRepository.save(tag));
    }

    this.logger.log(`Created ${tags.length} tags`);
    return tags;
  }

  private async seedUsers(count: number): Promise<UserEntity[]> {
    const users: UserEntity[] = [];

    for (let i = 0; i < count; i++) {
      const profileData = ProfileFactory.create();
      const profile = this.profileRepository.create(profileData);
      const savedProfile = await this.profileRepository.save(profile);

      const userData = UserFactory.create({
        profile: Promise.resolve(savedProfile),
      });
      const user = this.userRepository.create(userData);
      users.push(await this.userRepository.save(user));
    }

    this.logger.log(`Created ${users.length} users with profiles`);
    return users;
  }

  private async seedPosts(
    count: number,
    users: UserEntity[],
    tags: TagEntity[],
  ): Promise<void> {
    for (let i = 0; i < count; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      const randomTags = faker.helpers.arrayElements(
        tags,
        faker.number.int({ min: 1, max: 5 }),
      );

      const postData = PostFactory.create({
        user: Promise.resolve(randomUser),
        tags: Promise.resolve(randomTags),
      });

      const post = this.postRepository.create(postData);
      await this.postRepository.save(post);
    }

    this.logger.log(`Created ${count} posts`);
  }

  async clear() {
    this.logger.log('Clearing existing data...');
    
    try {
      // Use clear() method which doesn't require criteria
      await this.postRepository.clear();
      await this.tagRepository.clear();
      await this.userRepository.clear();
      await this.profileRepository.clear();
      this.logger.log('Database cleared');
    } catch (error) {
      this.logger.warn('Could not clear database:', error.message);
    }
  }
}