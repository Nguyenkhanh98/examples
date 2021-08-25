import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TYPEORM } from '../environments/index';
import { join } from 'path';

@Injectable()
export class TypeOrmSerivce implements TypeOrmOptionsFactory {
  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...TYPEORM,
      type: 'postgres',
      entities: [join(__dirname, '../..', '**', '*.entity.{ts,js}')],
      synchronize: true,
      migrations: [
        join(__dirname, '../..', 'database/migrations', '*.{ts,js}'),
      ],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
      autoLoadEntities: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      logging: true,
    };
  }
}
