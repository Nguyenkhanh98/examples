import { AppLogger } from '@configs';
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  AppLogger.log(
    'Request: ',
    JSON.stringify({
      headers: req.headers,
      body: req.body,
      params: req.params,
      path: req.path,
      cookie: req.cookies,
    }),
  );
  next();
}
