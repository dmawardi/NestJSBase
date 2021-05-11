import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  // Add config module for access to env vars
  imports: [ConfigModule],
  // This is the way to use global guard that uses dependency injection
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  // Middleware consumer provides set of useful methods to
  // tie middleware to specific routes
  configure(consumer: MiddlewareConsumer) {
    // tie middleware with all routes using asterisk eg. forRoutes('*')
    consumer.apply(LoggingMiddleware).forRoutes('*');

    // or be more specific using path+method object
    // consumer.apply(LoggingMiddleware).forRoutes({
    //   // For all routes in Coffees that use GET
    //   path: 'coffees',
    //   method: RequestMethod.GET,
    // });
    // To exclude routes, use consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*')
    // Above will add to all routes except coffees
  }
}
