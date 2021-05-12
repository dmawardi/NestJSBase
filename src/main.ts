import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add global interceptors
  // wrap response data in data attribute & timeout after 3 seconds
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
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
  // Generate Swagger options for base documentation
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  // Use nest app and options above to create document
  const document = SwaggerModule.createDocument(app, options);
  // init SwaggerModule (3 args): route used, nest app instance, and Swagger doc
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
