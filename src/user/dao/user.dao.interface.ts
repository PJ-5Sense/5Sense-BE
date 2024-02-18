import { CreateUser } from '../types/create-user.type';
import { UserEntity } from '../entities/user.entity';

export interface IUserDao {
  create(user: CreateUser): Promise<UserEntity>;
  findOne(userId: number): Promise<UserEntity | null>;
}

export const USER_DAO = Symbol('USER_DAO');
