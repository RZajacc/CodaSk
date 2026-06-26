import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {
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
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private configService: ConfigService<AuthType, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret', {
        infer: true,
      }),
    });
  }

  async validate(payload: JwtPayload): Promise<SafeUser> {
    const { sub } = payload;

    if (!sub) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private static extractJWT(this: void, req: Request): string | null {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token as string;
    }
    return null;
  }
}
