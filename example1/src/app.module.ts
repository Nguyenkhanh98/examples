import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmSerivce } from '@configs';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter, TransformInterceptor } from './common';

import { DeviceModule } from '@/cores/device/device.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmSerivce,
    }),
    DeviceModule,
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
