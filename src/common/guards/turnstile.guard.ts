import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class TurnstileGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers['x-captcha-token'];

    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Captcha token missing');
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;

    try {
      const response = await axios.post(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          secret,
          response: token,
          remoteip: request.ip,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.data.success) {
        throw new BadRequestException('Captcha verification failed');
      }

      return true;
    } catch {
      throw new BadRequestException('Captcha verification failed');
    }
  }
}
