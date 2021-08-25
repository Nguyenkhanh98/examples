import { RESPONSE_MESSAGE } from '@/_constant';
import { Body, ConflictException } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { DeviceService } from './device.service';
import { CreateDeviceDTO } from './dto/create-device.dto';

@ApiTags('devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create device' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({ type: CreateDeviceDTO })
  async createDevice(@Body() createDeviceDTO: CreateDeviceDTO) {
    const isExist = await this.deviceService.findOneBy({
      deviceId: createDeviceDTO.deviceId,
    });

    if (isExist) {
      throw new ConflictException(
        `'${createDeviceDTO.deviceId}' ${RESPONSE_MESSAGE.DUPPLICATE}`,
      );
    }

    const deviceAdded = await this.deviceService.cassadeCreate(createDeviceDTO);

    return {
      message: RESPONSE_MESSAGE.CREATE_SUCCESSFULLY,
      data: {
        device: deviceAdded,
      },
    };
  }
}
