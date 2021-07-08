import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserManagementModule } from './user-management.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserManagementModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen(() => console.log('Microservice is listening'));}
bootstrap();
