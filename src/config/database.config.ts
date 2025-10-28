import { ConfigService } from '@nestjs/config';
import { PostEntity } from 'src/entities/post.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { TagEntity } from 'src/entities/tag.entity';
import { UserEntity } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
  entities: [UserEntity, PostEntity, TagEntity, ProfileEntity],
});
