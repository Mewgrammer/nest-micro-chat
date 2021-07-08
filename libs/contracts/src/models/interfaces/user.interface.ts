import { UserRole } from '@nest-micro-chat/authentication';

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: number;
  updatedAt: number;
  role: UserRole;
}
