import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@nest-micro-chat/authentication';
import { User } from '@nest-micro-chat/contracts/models';

export class UserDto implements User {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: number;

  @ApiProperty()
  public updatedAt: number;

  @ApiProperty()
  public role: UserRole;
}
