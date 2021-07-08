import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@nest-micro-chat/authentication';

@Expose()
export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  public password: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @IsNotEmpty()
  public role: UserRole;
}
