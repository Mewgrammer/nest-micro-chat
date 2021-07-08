import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { DatabaseModule } from '../db/database.module';
import { AuthenticationModule } from '@nest-micro-chat/authentication';
import { UserProfile } from './mapping/user.profile';
import { CommonModule } from '@nest-micro-chat/common';

@Module({
  imports: [CommonModule, AuthenticationModule, DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserProfile],
  exports: [UsersService, UserProfile],
})
export class UsersModule {}
