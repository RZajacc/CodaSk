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
    console.log(req.cookies);
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken as string;
    }
    return null;
  }
}
