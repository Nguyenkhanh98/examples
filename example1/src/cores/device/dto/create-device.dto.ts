import {
  IsNotEmpty,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { DataType } from '@enums/DataType.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DataState {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  humidity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  temperature: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  occupancy: boolean;
}

export class CreateDeviceDTO {
  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceName: string;

  @ApiProperty({ enum: DataType })
  @IsEnum(DataType)
  dataType: DataType;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => DataState)
  data: DataState;
}
