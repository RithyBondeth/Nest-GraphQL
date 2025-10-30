import { ConfigService } from '@nestjs/config';
import { PostEntity } from '../entities/post.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { TagEntity } from '../entities/tag.entity';
import { UserEntity } from '../entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
  entities: [UserEntity, PostEntity, TagEntity, ProfileEntity],
});