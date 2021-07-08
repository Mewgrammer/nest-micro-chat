import { Injectable, LoggerService, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly _logger: LoggerService) {}

  use(req: Request | any, res: Response, next: () => void) {
    this._logger.debug(`${req.ip}: ${req.method} ${req.url}`);
    next();
  }
}
