import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

interface AuthType {
  auth: {
    accessTokenSecret: string;
    accessTokenExpiry: string;
  };
}

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<AuthType>) => ({
        secret: configService.get('auth.accessTokenSecret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.accessTokenExpiry', {
            infer: true,
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
