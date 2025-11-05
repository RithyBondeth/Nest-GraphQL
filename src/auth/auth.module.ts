import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { LoggerModule } from '@app/common/logger/logger.module';
import { JwtModule } from '@app/common/jwt/jwt.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule, JwtModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
