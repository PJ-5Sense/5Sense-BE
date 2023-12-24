// auth.service.interface.ts
import { JwtPayload } from './types/jwt-payload.type';
import { SocialType } from './types/social.type';

export interface IAuthService {
  socialLogin(
    provider: SocialType,
    code: string,
    state: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;

  reissueAccessToken(userAgent: string, refreshToken: string, jwtInfo: JwtPayload): Promise<{ accessToken: string }>;
}

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
