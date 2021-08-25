import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DeviceState } from '@/database/entities';
import { GenericService } from '@/helpers/genericService';

@Injectable()
export class DeviceStateService extends GenericService<DeviceState> {
  constructor(
    @InjectRepository(DeviceState)
    private readonly deviceStateRepository: Repository<DeviceState>,
  ) {
    super(deviceStateRepository);
  }
}
