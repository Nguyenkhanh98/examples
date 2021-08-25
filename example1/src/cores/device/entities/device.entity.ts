import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Expose, plainToClass } from 'class-transformer';

import { DeviceState } from '@/database/entities';

@Entity({
  name: 'devices',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Device {
  @Expose()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Expose()
  @Column({ unique: true })
  deviceId: string;

  @Expose()
  @Column()
  deviceName: string;

  @Expose()
  @Column('timestamp with time zone', {
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @Expose()
  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => DeviceState, (deviceState) => deviceState.device)
  deviceState: DeviceState[];

  constructor(device: Partial<Device>) {
    if (device) {
      Object.assign(
        this,
        plainToClass(Device, device, {
          excludeExtraneousValues: true,
        }),
      );
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
