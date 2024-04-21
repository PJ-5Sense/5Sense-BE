export type JwtPayload = {
  userId: number;
  centerId: number | null;
  open: string;
  close: string;
};
