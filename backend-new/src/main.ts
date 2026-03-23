import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  app: {
    port: number;
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfig, true>);

  await app.listen(configService.get('app.port', { infer: true }));
}
bootstrap();
