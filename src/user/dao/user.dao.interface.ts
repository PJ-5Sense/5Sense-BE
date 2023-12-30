import { CreateUser } from '../types/create-user.type';
import { UserEntity } from '../entities/user.entity';

export interface IUserDao {
  create(user: CreateUser): Promise<UserEntity>;
  findOneUserCenterByUserId(userId: number): Promise<UserEntity>;
}

export const USER_DAO = Symbol('USER_DAO');
