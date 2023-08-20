import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { env } from './config';
import { AppModule } from './modules';
import { ExceptionFilter, ResponseInterceptor } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(env.port);
  Logger.debug(`Listening on http://localhost:${env.port}/`);
}
bootstrap();
