import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fstat from 'fs';
import { dump } from 'js-yaml';
import { CreateItemDto } from './items/dto/create-item.dto';
import { CreateUserDto } from './auth/dto/create-user.dto';

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

  // mainでどう挙動するかよくわかってない、Next.jsで軽く触った気もするが忘れた
  if (process.env.NODE_ENV === 'development') {
    // Swaggerの初期設定
    const config = new DocumentBuilder()
      .setTitle('練習WebAPI')
      .setDescription('練習WebAPIの説明欄')
      .setVersion('1.0')
      .setOpenAPIVersion('3.0.4') // OpenAPI バージョンを明示的に設定
      .addBearerAuth(
        // Basic認証からBearer認証に変更
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // オプション：JWTを使用する場合
        },
        'jwt', // 認証スキーマの名前
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [CreateItemDto, CreateUserDto],
      deepScanRoutes: true,
    });
    fstat.writeFileSync('./src/docs/swagger-spec.yaml', dump(document, {}));
    SwaggerModule.setup('api/docs/', app, document);
  }
  await app.listen(8000);
}
bootstrap();
