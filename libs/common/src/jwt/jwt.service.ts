import { Injectable } from '@nestjs/common';
import { IAuthJwtPayload } from '../utils/interfaces/auth-jwt-payload.interface';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ac } from '@faker-js/faker/dist/airline-DF6RqYmq';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload: IAuthJwtPayload = {
      sub: {
        userId: userId,
      },
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
