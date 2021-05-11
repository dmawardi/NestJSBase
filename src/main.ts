import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add global interceptor
  app.useGlobalInterceptors(new WrapResponseInterceptor());
  // Global implementation of guard
  // app.useGlobalGuards(new ApiKeyGuard());
  // Our custom HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // Added for data validation. Uses class-validator and class-transformer packages
  // This allows us to add validation to our DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      // Makes sure all unwanted properties are automatically stripped out
      // This is possible through nest's dto system effortlessly
      whitelist: true,
      // If any non whitelisted data is detected, automatically forbid from proceeding
      forbidNonWhitelisted: true,
      // Automatically perform type conversion. eg) numbers and booleans
      transform: true,
      transformOptions: {
        // Types are assumed and don't need to be explicitly state
        // Auto converted
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
