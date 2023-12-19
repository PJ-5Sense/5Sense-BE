export type CreateUser = {
  name: string;
  profile: string;
  email: string;
  socialId: string;
  phone: string | null;
  centerId: number | null;
};
