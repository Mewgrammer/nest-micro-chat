import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@nest-micro-chat/authentication';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
