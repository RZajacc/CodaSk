import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  app: {
    port: number;
    origins: string[];
  };
}

type AsyncHandler = (
  event: APIGatewayProxyEvent,
  context: Context,
) => Promise<APIGatewayProxyResult>;

let serverlessExpressInstance: AsyncHandler | undefined;

async function setup(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const configService = nestApp.get(ConfigService<AppConfig, true>);

  const allowedOrigins = configService.get('app.origins', { infer: true });

  const config = new DocumentBuilder()
    .setTitle('Codask')
    .setDescription('App for Codac students in trouble')
    .setVersion('0.5')
    .addTag('Auth', 'User authentication endpoints')
    .addTag('Question', 'Questions operations')
    .addTag('User', 'User operations')
    .addTag('Tag', 'Tag operations')
    .addTag('Answer', 'Answers operations')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('docs', nestApp, documentFactory);

  nestApp.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    withCredentials: true,
  });

  await nestApp.init();

  serverlessExpressInstance = serverlessExpress({
    app: expressApp,
  }) as unknown as AsyncHandler;

  return serverlessExpressInstance(event, context);
}

export function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }

  return setup(event, context);
}
