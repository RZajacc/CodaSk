import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './question/question.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().port().required(),
        MONGO_URI: Joi.string().uri().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService<{ database: { mongoURI: string } }>,
      ) => ({
        uri: configService.get('database.mongoURI', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    QuestionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
