import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

interface AuthType {
  auth: {
    accessToken: {
      secret: string;
      expiresIn: string;
    };
  };
}

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService<AuthType>) => ({
    //     secret: configService.get('auth.accessToken.secret', { infer: true }),
    //     signOptions: {
    //       expiresIn: configService.get('auth.accessToken.expiresIn', {
    //         infer: true,
    //       }),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
