import { UserRole } from './user-role.enum';

export interface JwtPayload {
  userId: string;
  role: UserRole;
}
