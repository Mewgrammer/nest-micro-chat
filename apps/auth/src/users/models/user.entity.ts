import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@nest-micro-chat/authentication';
import { Type } from 'class-transformer';
import { User } from '@nest-micro-chat/contracts';
import { v4 as uuidv4 } from 'uuid';
import { AutoMap } from '@automapper/classes';

@Entity({
  name: 'users',
})
export class UserEntity implements User {
  @PrimaryColumn()
  @AutoMap()
  public id: string;

  @Column('varchar', { unique: true, nullable: false, length: 127 })
  @AutoMap()
  public email: string;

  @Column('varchar', { unique: true, nullable: false, length: 127 })
  @AutoMap()
  public name: string;

  @Column('varchar', { nullable: false, length: 255 })
  @AutoMap()
  public password: string;

  @Column({
    type: 'bigint',
    nullable: false,
    readonly: true,
  })
  @AutoMap()
  public createdAt: number;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  @AutoMap()
  public updatedAt: number;

  @Column('enum', {
    name: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.User,
  })
  public role: UserRole;

  @BeforeInsert()
  async beforeInsert() {
    this.id = uuidv4();
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = Date.now();
  }
}
