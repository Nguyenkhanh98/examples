import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';

import { Device } from '@/database/entities';

@Entity({
  name: 'device_states',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class DeviceState {
  @Expose()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose()
  @Column({ nullable: true })
  temperature: number;

  @Expose()
  @Column({ nullable: true })
  humidity: number;

  @Expose()
  @Column({ default: true })
  occupancy: boolean;

  @Expose()
  @Column('timestamp with time zone', {
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @Expose()
  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Device, (device) => device.deviceState)
  device: Device;

  constructor(deviceState: Partial<DeviceState>) {
    if (deviceState) {
      Object.assign(
        this,
        plainToClass(DeviceState, deviceState, {
          excludeExtraneousValues: true,
        }),
      );
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
