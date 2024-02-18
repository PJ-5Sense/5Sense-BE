import { SocialType } from 'src/auth/types/social.type';
import { UserEntity } from './entities/user.entity';
import { CreateSocial, CreateUser } from './types/create-user.type';

// social-login-strategy.interface.ts
export interface IUserService {
  /**
   * 유저 정보(소셜 정보 포함) 저장
   * (UserEntity를 Controller의 Response로 사용하지 않도록 주의 및 확인 필요)
   *
   * @param user
   * @returns UserEntity
   */
  createUser(user: CreateUser, social: CreateSocial): Promise<UserEntity>;

  findUserBySocialId(socialId: string, socialType: SocialType): Promise<UserEntity>;

  findOne(userId: number): Promise<UserEntity>;
}

export const USER_SERVICE = Symbol('USER_SERVICE');
