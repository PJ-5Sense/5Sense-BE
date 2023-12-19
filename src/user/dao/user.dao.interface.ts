import { SocialType } from 'src/auth/types/social.type';
import { CreateUser } from '../types/create-user.type';
import { UserEntity } from '../entities/user.entity';

export interface IUserDao {
  create(user: CreateUser): Promise<UserEntity>;
  findOneBySocialId(socialId: string, socialType: SocialType): Promise<UserEntity>;
}

export const USER_DAO = Symbol('USER_DAO');
