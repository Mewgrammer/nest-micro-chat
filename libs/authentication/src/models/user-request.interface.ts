import { Request } from 'express';
import { User } from '@nest-micro-chat/contracts';

export interface UserRequest extends Request {
  user: User;
}
