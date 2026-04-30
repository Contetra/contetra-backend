// src/auth/auth.types.ts
export type StoredUser = {
  username: string;
  password: string;
  email?: string;
  name?: string;
};

export type JwtPayload = { username: string };
