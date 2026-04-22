import { applyDecorators, UseGuards } from '@nestjs/common';
import { TurnstileGuard } from '../guards/turnstile.guard';

export function CaptchaProtected() {
  return applyDecorators(UseGuards(TurnstileGuard));
}
