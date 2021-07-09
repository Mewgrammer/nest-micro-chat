import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  providers: [AuthenticationService, JwtStrategy, RolesGuard, JwtAuthGuard],
  exports: [AuthenticationService, JwtStrategy, RolesGuard, JwtAuthGuard],
})
export class AuthenticationModule {}
