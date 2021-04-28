import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Added for data validation. Uses class-validator and class-transformer packages
  // This allows us to add validation to our DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      // Makes sure all unwanted properties are automatically stripped out
      // This is possible through nest's dto system effortlessly
      whitelist: true,
      // If any non whitelisted data is detected, automatically forbid from proceeding
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
