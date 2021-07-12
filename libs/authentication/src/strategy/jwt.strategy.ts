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

  // noinspection JSUnusedGlobalSymbols
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // const token = await this._authenticationService.signIn(payload);
    return payload;
  }
}
