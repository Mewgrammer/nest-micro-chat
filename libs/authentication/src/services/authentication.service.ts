import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@nest-micro-chat/authentication/models';

@Injectable()
export class AuthenticationService {
  constructor(private readonly _jwtService: JwtService, private readonly _configService: ConfigService) {}

  public async signIn(payload: JwtPayload): Promise<string> {
    try {
      return await this._jwtService.signAsync(payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials provided');
    }
  }
}
