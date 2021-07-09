import { Body, Controller, Get, Header, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserRequest } from '@nest-micro-chat/authentication';
import { CreateUserDto, LoginUserDto } from '@nest-micro-chat/contracts';
import { ExcludeNullInterceptor } from '@nest-micro-chat/common';
import { JwtTokenDto } from '@nest-micro-chat/contracts/models/dto/auth/jwt-tokenDto';

@ApiTags('AUTH')
@ApiBearerAuth()
@UseInterceptors(ExcludeNullInterceptor)
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('content-type', 'application/json')
  public authenticate(@Req() request: UserRequest) {
    return request.user;
  }

  @Post('register')
  public async register(@Body() registrationData: CreateUserDto) {
    return this._authService.register(registrationData);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginUserDto: LoginUserDto): Promise<JwtTokenDto> {
    return { token: await this._authService.login(loginUserDto) };
  }
}
