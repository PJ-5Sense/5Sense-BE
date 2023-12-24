// auth.service.interface.ts
import { SocialType } from './types/social.type';

export interface IAuthService {
  socialLogin(
    provider: SocialType,
    code: string,
    state: string,
    userAgent: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  generateJWtToken(payload: {
    userId: number;
    socialId: string;
    centerId: number;
  }): Promise<{ accessToken: string; refreshToken: string }>;
}

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
