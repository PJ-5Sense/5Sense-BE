import { SocialType } from './social.type';

export type JwtPayload = {
  userId: number;
  centerId: number | null;
  socialId: string;
  socialType: SocialType;
};
