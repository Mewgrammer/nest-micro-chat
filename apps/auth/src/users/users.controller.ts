import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from '@nest-micro-chat/contracts/models/dto/auth/update-user.dto';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard, RolesGuard, UserRole } from '@nest-micro-chat/authentication';
import { CreateUserDto, UserDto } from '@nest-micro-chat/contracts';
import { Roles } from '@nest-micro-chat/authentication/decorators/roles.decorator';
import { ExcludeNullInterceptor } from '@nest-micro-chat/common';
import { Mapper } from '@automapper/types';
import { UserEntity } from './models/user.entity';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';

@ApiTags('USERS')
@ApiBearerAuth()
@UseInterceptors(ExcludeNullInterceptor)
@UseGuards(RolesGuard)
@Controller('v1/users')
export class UsersController {
  constructor(private readonly _userService: UsersService, @InjectMapper() private readonly _mapper: Mapper) {}

  @Get()
  @Roles(UserRole.Administrator)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity, { isArray: true }))
  public async getUsers(): Promise<UserDto[]> {
    return await this._userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Administrator)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this._userService.findById(id);
  }

  @Post()
  @Roles(UserRole.Administrator)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  public async createUser(@Body() userData: CreateUserDto): Promise<UserDto> {
    return await this._userService.create(userData);
  }

  @Put(':id')
  @Roles(UserRole.Administrator)
  @UseInterceptors(MapInterceptor(UserDto, UserEntity))
  public async updateUser(@Body() userData: UpdateUserDto): Promise<UserDto> {
    return await this._userService.update(userData);
  }

  @Delete(':id')
  @Roles(UserRole.Administrator)
  public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this._userService.delete(id);
  }
}
