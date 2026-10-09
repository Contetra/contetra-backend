import { SetMetadata } from '@nestjs/common';

export const CHECK_POLICY_KEY = 'checkPolicy';

export type CheckPolicyMetadata = { action: string; resourceType: string };

export const CheckPolicy = (action: string, resourceType: string) =>
  SetMetadata<string, CheckPolicyMetadata>(CHECK_POLICY_KEY, {
    action,
    resourceType,
  });
