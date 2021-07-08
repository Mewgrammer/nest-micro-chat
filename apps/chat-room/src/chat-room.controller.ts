import { Controller, Get } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';

@Controller()
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  getHello(): string {
    return this.chatRoomService.getHello();
  }
}
