import { SocialType } from './social.type';

export type CreateAuthDto = {
  id?: number;

  userId?: number;

  socialId: string;

  socialType: SocialType;

  socialAccessToken: string;

  socialRefreshToken: string;

  appRefreshToken: string;

  userAgent: string;
};
