import { LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { utilities as winstonUtilities } from 'nest-winston/dist/winston.utilities';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DailyRotateFile from 'winston-daily-rotate-file';
require('winston-daily-rotate-file');

export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), winstonUtilities.format.nestLike()),
        }),
        new winston.transports.DailyRotateFile({
          filename: `nest-chat`,
          dirname: 'logs',
          extension: '.log',
          zippedArchive: true,
          maxFiles: 30,
          maxSize: 100000,
          format: winston.format.combine(
            winston.format.timestamp({ format: () => new Date().toISOString().slice(11, 23) }),
            winston.format.simple(),
            winston.format.align(),
            winston.format.printf((info) => `${info.timestamp}|${info.level.toUpperCase()}|${info.message}`),
          ),
        }),
      ],
    });
    console.log = (message: any, params?: any) => {
      this.logger.info(message, params);
    };
    console.debug = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
    console.warn = (message: any, params?: any) => {
      this.logger.warn(message, params);
    };
    console.error = (message: any, params?: any) => {
      this.logger.error(message, params);
    };
    console.log('logging service ready');
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(message, meta);
  }
  error(message: string, ...trace: any[]) {
    this.logger.error(message, trace);
  }
  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, meta);
  }
  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, meta);
  }
  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(message, meta);
  }
}
