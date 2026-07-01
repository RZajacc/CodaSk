import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { SafeUser } from '../auth.service';
import { Request } from 'express';

interface AuthType {
  auth: {
    accessToken: {
      secret: string;
      expiresIn: string;
    };
  };
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private configService: ConfigService<AuthType, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('auth.accessToken.secret', {
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
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken as string;
    }
    return null;
  }
}
