import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface AuthConfig {
  auth: {
    refreshToken: {
      secret: string;
      expiresIn: string;
    };
  };
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService<AuthConfig, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'Test',
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies.refreshToken as string;
    return { ...payload, refreshToken };
  }

  private static extractJWT(this: void, req: Request): string | null {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token as string;
    }
    return null;
  }
}
