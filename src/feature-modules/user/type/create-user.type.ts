import { SocialType } from 'src/feature-modules/auth/type/social.type';

export class CreateSocial {
  socialId: string;
  socialType: SocialType;
  socialAccessToken: string;
  socialRefreshToken: string;
}

export type CreateUser = {
  name: string;
  profile: string;
  email: string;
  phone: string | null;
};
