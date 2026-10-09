import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import {
  CHECK_POLICY_KEY,
  CheckPolicyMetadata,
} from '../decorators/check-policy.decorator';
import { PolicyService } from 'src/rbac/policy.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyService: PolicyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.getAllAndOverride<
      CheckPolicyMetadata | undefined
    >(CHECK_POLICY_KEY, [context.getHandler(), context.getClass()]);

    // Opt-in guard: a route without @CheckPolicy is unaffected.
    if (!metadata) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user?.userId;
    if (!userId) {
      throw new ForbiddenException(
        'No authenticated user to evaluate policy against',
      );
    }

    const allowed = await this.policyService.can(
      userId,
      metadata.action,
      metadata.resourceType,
    );

    if (!allowed) {
      throw new ForbiddenException(
        `Not permitted to ${metadata.action} ${metadata.resourceType}`,
      );
    }

    return true;
  }
}
