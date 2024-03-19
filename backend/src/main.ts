import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { validationExceptionFactory } from './core/exceptions/validation-exception-factory';

async function bootstrap() {
  const { BACKEND_CONTAINER_PORT, FRONTEND_HOST_DOMAIN } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [FRONTEND_HOST_DOMAIN],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app
    .listen(BACKEND_CONTAINER_PORT, () =>
      console.log(`Running on Port ${BACKEND_CONTAINER_PORT}`),
    )
    .catch((error) => console.log(error));
}
bootstrap();
