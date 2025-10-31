import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { DatabaseSeeder } from './database.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const seeder = app.get(DatabaseSeeder);

  try {
    await seeder.seed();
    console.log('Seeding database completed successfully');
  } catch (error) {
    console.error('Seeding database failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
