import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserRequest } from '@nest-micro-chat/authentication';
import { CreateUserDto, LoginUserDto } from '@nest-micro-chat/contracts';
import { ExcludeNullInterceptor } from '@nest-micro-chat/common';

@ApiTags('AUTH')
@ApiBearerAuth()
@UseInterceptors(ExcludeNullInterceptor)
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public authenticate(@Req() request: UserRequest) {
    return request.user;
  }

  @Post('register')
  public async register(@Body() registrationData: CreateUserDto) {
    return this._authService.register(registrationData);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this._authService.login(loginUserDto);
  }
}
