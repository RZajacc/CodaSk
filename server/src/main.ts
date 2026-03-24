import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

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

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    withCredentials: true,
  });

  await app.listen(configService.get('app.port', { infer: true }));
}
bootstrap();
