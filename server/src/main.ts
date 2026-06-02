import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface AppConfig {
  app: {
    port: number;
    origins: string[];
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AppConfig, true>);

  const allowedOrigins = configService.get('app.origins', { infer: true });

  const config = new DocumentBuilder()
    .setTitle('Codask')
    .setDescription('App for Codac students in trouble')
    .setVersion('0.5')
    .addTag('Auth')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    withCredentials: true,
  });

  await app.listen(configService.get('app.port', { infer: true }));
}
bootstrap();
