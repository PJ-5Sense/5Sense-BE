export type CreateAuthDto = {
  id?: number;

  userId: number;

  appRefreshToken: string;

  userAgent: string;
};
