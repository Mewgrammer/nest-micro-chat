import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
