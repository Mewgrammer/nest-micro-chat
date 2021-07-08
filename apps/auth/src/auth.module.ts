import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from '@nest-micro-chat/authentication';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/auth/.env',
    }),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
