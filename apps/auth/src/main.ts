import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { LoggerService } from '@nest-micro-chat/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    logger: new LoggerService(),
  });
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for auth service')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const logger = app.get<LoggerService>(LoggerService);

  const port = parseInt(process.env.PORT, 10) || 3000;
  app.listen(port).then(() => {
    logger.log(`Auth Service listenting on port ${port}`);
  });
}

bootstrap();
