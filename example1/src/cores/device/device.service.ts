import { Device, DeviceState } from '@/database/entities';
import { DataType } from '@/database/enums/DataType.enum';
import { GenericService } from '@/helpers/genericService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { CreateDeviceDTO } from './dto/create-device.dto';

@Injectable()
export class DeviceService extends GenericService<Device> {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
    super(deviceRepository);
  }

  async cassadeCreate(createDevice: CreateDeviceDTO) {
    const { dataType, data } = createDevice;

    const device = new Device(createDevice);

    if (dataType === DataType.DATA) {
      const { humidity, temperature, occupancy } = data;

      const deviceState = new DeviceState({
        humidity,
        temperature,
        occupancy,
      });

      await getConnection().manager.save(deviceState);
      device.deviceState = [deviceState];
    }

    return await getConnection().manager.save(device);
  }
}
