import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomService } from './chat-room.service';

describe('ChatRoomController', () => {
  let chatRoomController: ChatRoomController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomController],
      providers: [ChatRoomService],
    }).compile();

    chatRoomController = app.get<ChatRoomController>(ChatRoomController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatRoomController.getHello()).toBe('Hello World!');
    });
  });
});
