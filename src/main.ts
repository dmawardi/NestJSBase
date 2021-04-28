import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Added for data validation. Uses class-validator and class-transformer packages
  // This allows us to add validation to our DTO's
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
