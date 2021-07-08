import { NestFactory } from '@nestjs/core';
import { ChatRoomModule } from './chat-room.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatRoomModule);
  await app.listen(3000);
}
bootstrap();
