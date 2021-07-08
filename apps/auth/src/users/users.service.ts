import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UpdateUserDto } from '@nest-micro-chat/contracts/models/dto/auth/update-user.dto';
import { isEmail, isNumber } from 'class-validator';
import { CreateUserDto } from '@nest-micro-chat/contracts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  /**
   * @return list of all models
   */
  public async findAll(): Promise<UserEntity[]> {
    return await this._userRepo.find();
  }

  /**
   * @param id - ID of the user
   * @return the user with ID
   * @throws BadRequestException id is not a number
   * @throws NotFoundException user with ID does not exist
   */
  public async findById(id: number): Promise<UserEntity> {
    if (!isNumber(id)) {
      throw new BadRequestException('id must be a number');
    }
    const user = await this._userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} does not exist`);
    }
    return user;
  }

  /**
   * @param email - E-Mail address of the user
   * @return the user for the email
   * @throws BadRequestException email is null
   * @throws NotFoundException user with email does not exist
   */
  public async findByEmail(email: string): Promise<UserEntity> {
    if (!isEmail(email)) {
      throw new BadRequestException('email must be a valid address');
    }
    const user = await this._userRepo.findOne({ email });
    if (!user) {
      throw new NotFoundException(`user with email ${email} does not exist`);
    }
    return user;
  }

  /**
   * @param userData - the updated user data
   * @throws BadRequestException ID is not valid
   * @throws NotFoundException user with ID does not exist
   */
  public async update(userData: UpdateUserDto): Promise<UserEntity> {
    if (!userData) {
      throw new BadRequestException('no data provided');
    }
    const user = await this._userRepo.findOne(userData.id);
    if (!user) {
      throw new NotFoundException(`user with id ${userData.id} does not exist`);
    }
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    Logger.debug(`updated user ${user.id} (${user.email}`);
    return await this._userRepo.save(user);
  }

  /**
   * creates a new user
   * @param userData - the data for the user
   * @throws BadRequestException userData is null
   */
  public async create(userData: CreateUserDto): Promise<UserEntity> {
    if (!userData) {
      throw new BadRequestException('userData cannot be null');
    }
    return await this.addUser(userData);
  }

  /**
   * deletes a existing user
   * @param id - ID of the user to be deleted
   * @throws NotFoundException user with ID does not exist
   */
  public async delete(id: number): Promise<DeleteResult> {
    if (!isNumber(id)) {
      throw new BadRequestException('id must be a number');
    }
    const deleteResult = await this._userRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`user with id ${id} does not exist`);
    }
    Logger.debug(`deleted user (${id}`);
    return deleteResult;
  }

  /**
   * adds a user to the repository
   * @param user - the user to be added
   * @return the created user entity
   */
  public async addUser(user: CreateUserDto): Promise<UserEntity> {
    const createEntity = await this._userRepo.create(user);
    const createdUser = await this._userRepo.save(createEntity);
    Logger.debug(`created user ${createdUser.email} (${createdUser.id})`);
    return createdUser;
  }
}
