import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import path from 'path';

const AppLogger = WinstonModule.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      dirname: path.join(__dirname, '../..', 'logs'),
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
      dirname: path.join(__dirname, '../..', 'logs'),
    }),
    process.env.NODE_ENV !== 'production' &&
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
});

export { AppLogger };
