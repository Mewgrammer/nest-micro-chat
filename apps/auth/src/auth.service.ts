import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from '@nest-micro-chat/authentication';
import { CreateUserDto, LoginUserDto, PostgresErrorCode, User } from '@nest-micro-chat/contracts';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UsersService, private _authenticationService: AuthenticationService) {}

  /**
   * creates a new user
   * @param userData - data for the user
   * @return the created user
   * @throws BadRequestException userData is null
   * @throws ConflictException user with email already exists
   * @throws InternalServerErrorException user creation fails
   */
  public async register(userData: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this._userService.create(userData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('User with that email already exists');
      }
      throw new InternalServerErrorException(error, 'An unexpected error occurred while processing the request');
    }
  }

  /**
   * authenticates the user and returns a JWT
   * @param loginData - login credentials for the user
   * @return JWT for the user
   * @throws BadRequestException loginData is null
   * @throws UnauthorizedException credential validation fails
   */
  public async login(loginData: LoginUserDto): Promise<string> {
    const user = await this._userService.findByEmail(loginData.email);
    if (!user) throw new NotFoundException(`user with email ${loginData.email} does not exist`);
    try {
      await AuthService.verifyPassword(loginData.plainTextPassword, user.password);
      return await this._authenticationService.signIn(user.id, user.role);
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  /**
   * @param plainTextPassword - the user's password in plain text
   * @param hashedPassword - the user's hashed password
   * @return whether the passwords match
   * @throws UnauthorizedException passwords do not match
   */
  private static async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
    return isPasswordMatching;
  }
}
