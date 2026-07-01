import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { SafeUser } from '../auth.service';
import { UserService } from '../../user/user.service';

interface AuthType {
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
  constructor(
    private userService: UserService,
    private configService: ConfigService<AuthType, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('auth.refreshToken.secret', {
        infer: true,
      }),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<SafeUser> {
    const { sub } = payload;

    if (!sub) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!req.cookies && !('refreshToken' in req.cookies)) {
      throw new ForbiddenException('Access Denied');
    }

    const cookieRefreshToken = req.cookies.refreshToken as string;

    return { ...user, refreshToken: cookieRefreshToken };
  }

  private static extractJWT(this: void, req: Request): string | null {
    if (req.cookies && 'refreshToken' in req.cookies) {
      return req.cookies.refreshToken as string;
    }
    return null;
  }
}
