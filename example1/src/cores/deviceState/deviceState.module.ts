import { Module } from '@nestjs/common';
import { DeviceState } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceStateService } from './deviceState.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceState])],
  providers: [DeviceStateService],
  exports: [DeviceStateService],
})
export class DeviceModule {}
