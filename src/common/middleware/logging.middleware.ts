import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Set new timer to start
    console.time('Request-response time');
    console.log('Hi from Middleware');
    // Look at express finish event to determine request completion
    // then run function that ends timer and prints to console
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
