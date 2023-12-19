import { SocialType } from './social.type';

export type CreateAuthDto = {
  socialId: string;

  socialType: SocialType;

  socialAccessToken: string;

  socialRefreshToken: string;

  appRefreshToken: string;
};
