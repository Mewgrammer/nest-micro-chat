import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRoomService {
  getHello(): string {
    return 'Hello World!';
  }
}
