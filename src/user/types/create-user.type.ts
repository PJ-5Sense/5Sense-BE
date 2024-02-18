export class CreateSocial {
  socialId: string;
  socialType: string;
  socialAccessToken: string;
  socialRefreshToken: string;
}

export type CreateUser = {
  name: string;
  profile: string;
  email: string;
  phone: string | null;
};
