import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseSeeder } from './database.seeder';
import { databaseConfig } from '../config/database.config';
import { UserEntity } from '../entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { TagEntity } from '../entities/tag.entity';
import { ProfileEntity } from '../entities/profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      TagEntity,
      ProfileEntity,
    ]),
  ],
  providers: [DatabaseSeeder],
})
export class SeederModule {}