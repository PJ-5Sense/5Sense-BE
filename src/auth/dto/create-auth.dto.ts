import { SocialType } from '../types/social.type';

export class CreateAuthDto {
  socialId: string;

  socialType: SocialType;

  socialAccessToken: string;

  socialRefreshToken: string;

  appRefreshToken: string;
}
