import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../models/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '@nest-micro-chat/authentication/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authenticationService: AuthenticationService, private readonly _configService: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<string> {
    return await this._authenticationService.signIn(payload.userId, payload.role);
  }
}
