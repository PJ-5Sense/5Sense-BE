import { UserEntity } from './entities/user.entity';
import { CreateUser } from './types/create-user.type';

// social-login-strategy.interface.ts
export interface IUserService {
  /**
   * 유저 정보를 성공적으로 삽입하면 UserEntity를 리턴함
   * (UserEntity를 Controller의 Response로 사용하지 않도록 주의 및 확인 필요)
   *
   * @param user
   * @returns UserEntity
   */
  create(user: CreateUser): Promise<UserEntity>;

  /**
   * 유저에게 등록된 센터정보가 있는지 확인하는 함수
   * (JWT Token에 Center 정보를 등록하기 위해 사용됨)
   * @param userId
   */
  findOneUserCenterByUserId(userId: number): Promise<number | null>;
}

export const USER_SERVICE = Symbol('USER_SERVICE');
// 인증모듈에서 센터정보를 가져오는 방법을 어떻게 해야할 지 고민하다 마무리함
