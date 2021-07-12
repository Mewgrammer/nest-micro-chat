import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule, JwtAuthGuard } from '@nest-micro-chat/authentication';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/auth/.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
