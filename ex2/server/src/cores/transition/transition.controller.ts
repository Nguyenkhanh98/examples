import { CACHE_KEY, RESPONSE_MESSAGE } from '@/_constant';
import {
  Body,
  ConflictException,
  UseInterceptors,
  Get,
  Param,
  Req,
  Res,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controller, Post } from '@nestjs/common';

import { TransitionService } from './transition.service';
import { CustomResponse } from '@common';
import { HttpCacheInterceptor } from '@common';
import { v4 as uuidv4 } from 'uuid';

import { State } from './dto/getState.dto';
import { STATE } from '@/_constant/Transition';

@Controller('transitions')
// @UseInterceptors(HttpCacheInterceptor)
export class TransitionController {
  constructor(private readonly transitionService: TransitionService) {}

  @Patch('reset')
  async reset(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    let xAuth = request.headers['x-auth'];

    if (!xAuth) {
      xAuth = uuidv4();
    }

    const result = await this.transitionService.reset(xAuth);
    response.set('x-auth', xAuth);

    return {
      message: 'Successfully',
      data: {
        state: result,
      },
    };
  }

  @Patch(':state')
  async getNextState(
    @Param() state: State,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<CustomResponse<any>>> {
    let xAuth: any = request.headers['x-auth'];

    if (!xAuth) {
      xAuth = uuidv4();
    }

    const result = await this.transitionService.getNextState(
      state.state,
      xAuth,
    );
    response.set('x-auth', xAuth);
    return {
      message: 'Successfully',
      data: {
        state: result,
      },
    };
  }

  // }
}
