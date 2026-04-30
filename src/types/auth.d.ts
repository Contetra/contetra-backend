export type JwtPayload = {
  sub: string; // user id
  email: string;
  userId: string;
  roles?: string[];
  iat?: number;
  exp?: number;
};
