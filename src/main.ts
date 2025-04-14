import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Env } from './config/env';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const nodeEnv = process.env.NODE_ENV as Env;

  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('api for common crm use')
    .setVersion('1.0')
    .addBearerAuth();

  if (nodeEnv !== Env.LOCAL) {
    config.addServer('/api');
    app.setGlobalPrefix('api');
  }

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api-docs', app, documentFactory);

  const port = process.env.APP_PORT ?? 3001;

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(port, () => {
    console.log(`crm app started on ${port}`);
  });
}
bootstrap();
