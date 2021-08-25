import { Catch, ArgumentsHost } from '@nestjs/common';
import { Request } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppLogger } from '@configs';
import { RESPONSE_MESSAGE } from '@/_constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();

    const context = {
      params: request.params,
      path: request.path,
      body: request.body,
      headers: request.headers,
    };

    AppLogger.error({
      context,
      response: exception['response'] || {},
      stack: exception['stack'] || {},
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });

    super.catch(exception, host);
  }
}
