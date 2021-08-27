import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import { LoggerMiddleware } from './common';
import { AppLogger } from '@configs';
import { AppModule } from './app.module';
import { PORT } from '@environments';
import { HEADER } from '@constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: AppLogger,
  });

  app.enableCors();
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Expose-Headers',
      HEADER.ACCESS_CONTROL_EXPOSE_HEADERS.join(', '),
    );
    next();
  });
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.use(LoggerMiddleware);

  await app.listen(PORT || 8080);
  AppLogger.log(`Server start at ${PORT || 8080}`);
}

bootstrap();
