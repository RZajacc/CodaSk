import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';

interface AuthType {
  auth: {
    accessToken: {
      secret: string;
      expiresIn: string;
    };
    refreshToken: {
      secret: string;
      expiresIn: string;
    };
  };
}

export type SafeUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<AuthType, true>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async register(registerUserDTO: RegisterUserDto) {
    return this.userService.register(registerUserDTO);
  }

  async login(user: SafeUser) {
    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);
    return { tokens, user };
  }

  async logout(userId: string) {
    const loggedOutUser = await this.userService.update(userId, {
      refreshToken: '',
    });
    if (loggedOutUser) {
      return 'Logging out successful';
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get('auth.accessToken.secret', {
            infer: true,
          }),
          expiresIn: this.configService.get('auth.accessToken.expiresIn', {
            infer: true,
          }),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get('auth.refreshToken.secret', {
            infer: true,
          }),
          expiresIn: this.configService.get('auth.refreshToken.expiresIn', {
            infer: true,
          }),
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
