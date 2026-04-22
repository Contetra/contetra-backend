// src/common/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from 'src/types/auth';

/**
 * @User() -> returns the whole JwtPayload | undefined
 * @User('sub') -> returns the specific property (e.g. id string)
 */
export const User = createParamDecorator(
  <K extends keyof JwtPayload>(
    data: K | undefined,
    ctx: ExecutionContext,
  ): JwtPayload | JwtPayload[K] | undefined => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user; // already typed in express.d.ts

    if (!user) return undefined;
    if (!data) return user;

    return user[data];
  },
);
