import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';

import { LoggerMiddleware } from './common';
import { AppLogger } from '@configs';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: AppLogger,
  });

  const connection = getConnection('default');

  const { isConnected } = connection;

  isConnected
    ? AppLogger.log(`  Database connected`, 'TypeORM')
    : AppLogger.error(` Database connect error`, '', 'TypeORM');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(compression());

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.use(LoggerMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('Test API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT) || 8080);
}

bootstrap();
