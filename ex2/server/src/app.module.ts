import { Module, Logger, CacheModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter, TransformInterceptor } from './common';

import { TransitionModule } from '@/cores/transition/transition.module';

import { join } from 'path';
console.log();
@Module({
  imports: [
    CacheModule.register({
      ttl: 30 * 60,
    }),
    TransitionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'statics'),
      exclude: ['/api*'],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    Logger,
  ],
})
export class AppModule {}
