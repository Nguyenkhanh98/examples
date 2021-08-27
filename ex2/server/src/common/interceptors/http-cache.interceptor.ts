import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const httpServer = httpAdapter.getHttpServer();
    // console.log(httpServer);
    // console.log(httpServer.getRequestMethod);
    // const isGetRequest = this.httpServer.getRequestMethod(request) === 'GET';
    // const isGetRequest = httpServer.getRequestMethod(request) === 'GET';
    // const excludePaths = [];
    // if (
    //   !isGetRequest ||
    //   (isGetRequest && excludePaths.includes(httpServer.getRequestUrl))
    // ) {
    //   return undefined;
    // }
    // return httpServer.getRequestUrl(request);
    // console.log(context);
    console.log(request);

    return 'key';
  }
}
