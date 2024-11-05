import { SocialType } from './social.type';
export type SocialUserInfo = {
  socialId: string;
  email: string | null;
  phone: string | null;
  profile: string;
  name: string;
  socialType: SocialType;
};

/**
 *  @type socialAccessToken: 사용자의 소셜 액세스 토큰
 *  @type socialRefreshToken: 사용자의 소셜 리프레시 토큰
 *  @type socialUserInfo: 사용자의 소셜 로그인 정보;
 */
export type SocialLogin = {
  accessToken: string; // 사용자의 소셜 액세스 토큰
  refreshToken: string; // 사용자의 소셜 리프레시 토큰
  socialUserInfo: SocialUserInfo; // 사용자의 소셜 로그인 정보;
};
