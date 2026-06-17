import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './question/question.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
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
        CORS_ORIGINS: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService<{ database: { mongoURI: string } }>,
      ) => ({
        uri: configService.get('database.mongoURI', { infer: true }),
        //   Connection pool settings
        maxPoolSize: 10,
        minPoolSize: 5,
        //   Timeouts
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        //   Write concern for data durability
        writeConcern: {
          w: 'majority',
          j: true,
        },
        //   Read preference for replica sets
        readPreference: 'primaryPreferred',
        //   Retry failed operations
        retryWrites: true,
        retryReads: true,
      }),
      inject: [ConfigService],
    }),
    QuestionModule,
    UserModule,
    TagModule,
    AnswerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
