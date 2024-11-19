import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that do not have decorators
      transform: true, // transform payload to DTO instances
      forbidNonWhitelisted: true, // throw error if payload has properties that do not have decorators
      transformOptions: {
        // enable implicit type conversion (e.g. string to number)
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
