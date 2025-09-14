import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 8080);
  // app.enableCors(); // 全てのオリジンからのリクエストを許可する

  // あまりわからない
  app.enableCors({
    origin: ['http://example.com:1234'],
    methods: ['GET', 'POST'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(8000);
}
bootstrap();
