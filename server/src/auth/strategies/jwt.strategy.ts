import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

interface AuthType {
  auth: {
    accessTokenSecret: string;
    accessTokenExpiry: string;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<AuthType, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessTokenSecret', { infer: true }),
    });
  }

  validate(payload: JwtPayload) {
    // Zwróć usera przez find one
    return { userId: payload.sub };
  }
}
