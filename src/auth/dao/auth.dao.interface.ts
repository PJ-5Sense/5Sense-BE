import { CreateAuthDto } from '../types/create-auth.dto';
import { AuthEntity } from '../entities/auth.entity';

export interface IAuthDao {
  /**
   * 인증 정보를 생성하거나 업데이트하는 함수
   *
   * @param socialData - socialData Properties
   *   - id(Optional) : 기존 인증 정보를 업데이트 할 시 필수값
   *   - userId : 유저 아이디
   *   - socialId : 유저의 소셜로그인 고유 식별자 정보
   *   - socialType : 소셜 인증 로그인 타입 (e.g., 'google', 'facebook')
   *   - socialAccessToken : 소셜로그인 측에서 제공한 엑세스 토큰
   *   - socialRefreshToken : 소셜로그인 측에서 제공한 리프레쉬 토큰
   *   - appRefreshToken : App에서 제공하는 엑세스 토큰 재발급에 필요한 리프레쉬 토큰
   *   - userAgent : 유저 디바이스 정보
   * @returns A Promise of the AuthEntity
   */
  createOrUpdate(socialData: CreateAuthDto): Promise<AuthEntity>;

  findOneByUserAgent(userId: number, userAgent: string): Promise<AuthEntity>;
}

export const AUTH_DAO = Symbol('AUTH_DAO');
