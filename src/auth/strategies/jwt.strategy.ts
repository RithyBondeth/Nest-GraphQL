import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IAuthJwtPayload } from '@app/common/utils/interfaces/auth-jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  validate(payload: IAuthJwtPayload) {
    const userId = payload.sub.userId;
    console.log({ userId });
    const jwtUser = this.authService.validateJwtUser(userId);
    console.log({ jwtUser });
    return jwtUser;
  }
}
