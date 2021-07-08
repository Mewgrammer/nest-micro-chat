import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@nest-micro-chat/authentication/models';

@Injectable()
export class AuthenticationService {
  constructor(private readonly _jwtService: JwtService, private readonly _configService: ConfigService) {}

  public async signIn(userId: string, role: UserRole): Promise<string> {
    try {
      return await this._jwtService.signAsync({ userId, role });
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials provided');
    }
  }

  public async verifyToken(token: string) {
    await this._jwtService.verifyAsync(token);
  }
}
