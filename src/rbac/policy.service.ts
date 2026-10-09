import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, inArray, isNull, or } from 'drizzle-orm';
import {
  accessLogsTable,
  policiesTable,
  policyBindingsTable,
  userAttributesTable,
  userRolesTable,
} from 'src/common/drizzle/schema';

type MatchedPolicy = {
  name: string;
  effect: 'allow' | 'deny';
  resource_type: string;
  condition: string;
};

type UserContext = {
  roleIds: string[];
  attributes: Record<string, string>;
};

@Injectable()
export class PolicyService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async can(
    userId: string,
    action: string,
    resourceType: string,
    resourceId?: string,
  ): Promise<boolean> {
    const result = await this.canMany(userId, action, [resourceType], resourceId);
    return result[resourceType] ?? false;
  }

  async canMany(
    userId: string,
    action: string,
    resourceTypes: string[],
    resourceId?: string,
  ): Promise<Record<string, boolean>> {
    if (resourceTypes.length === 0) return {};

    const context = await this.buildUserContext(userId);
    const matches = await this.findMatchingPolicies(
      userId,
      action,
      resourceTypes,
      context.roleIds,
      resourceId,
    );

    const byResourceType = new Map<string, MatchedPolicy[]>();
    for (const row of matches) {
      const list = byResourceType.get(row.resource_type) ?? [];
      list.push(row);
      byResourceType.set(row.resource_type, list);
    }

    const decisions: Record<string, boolean> = {};
    const logRows: (typeof accessLogsTable.$inferInsert)[] = [];

    for (const resourceType of resourceTypes) {
      const applicable = (byResourceType.get(resourceType) ?? []).filter(
        (policy) => this.evaluateCondition(policy.condition, context.attributes),
      );

      const hasDeny = applicable.some((p) => p.effect === 'deny');
      const hasAllow = applicable.some((p) => p.effect === 'allow');
      const allowed = !hasDeny && hasAllow; // deny overrides allow; default deny

      decisions[resourceType] = allowed;
      logRows.push({
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId ?? null,
        decision: allowed ? 'allow' : 'deny',
        reason: this.describeDecision(applicable, allowed),
      });
    }

    this.writeAccessLogs(logRows);

    return decisions;
  }

  private async findMatchingPolicies(
    userId: string,
    action: string,
    resourceTypes: string[],
    roleIds: string[],
    resourceId?: string,
  ): Promise<MatchedPolicy[]> {
    const grantedToUser =
      roleIds.length > 0
        ? or(
            eq(policyBindingsTable.user_id, userId),
            inArray(policyBindingsTable.role_id, roleIds),
          )
        : eq(policyBindingsTable.user_id, userId);

    return this.db
      .select({
        name: policiesTable.name,
        effect: policiesTable.effect,
        resource_type: policiesTable.resource_type,
        condition: policiesTable.condition,
      })
      .from(policyBindingsTable)
      .innerJoin(policiesTable, eq(policyBindingsTable.policy_id, policiesTable.id))
      .where(
        and(
          eq(policiesTable.action, action),
          inArray(policiesTable.resource_type, resourceTypes),
          resourceId
            ? eq(policyBindingsTable.resource_id, resourceId)
            : isNull(policyBindingsTable.resource_id),
          grantedToUser,
        ),
      ) as Promise<MatchedPolicy[]>;
  }

  private async buildUserContext(userId: string): Promise<UserContext> {
    const [roles, attributes] = await Promise.all([
      this.db
        .select({ role_id: userRolesTable.role_id })
        .from(userRolesTable)
        .where(eq(userRolesTable.user_id, userId)),
      this.db
        .select({ key: userAttributesTable.key, value: userAttributesTable.value })
        .from(userAttributesTable)
        .where(eq(userAttributesTable.user_id, userId)),
    ]);

    const attributeMap: Record<string, string> = {};
    for (const attr of attributes) {
      attributeMap[`user.${attr.key}`] = attr.value;
    }

    return {
      roleIds: roles.map((r) => r.role_id),
      attributes: attributeMap,
    };
  }

  /** Flat dotted-key equality check, e.g. {"user.department":"marketing"}. Empty object always matches. */
  private evaluateCondition(
    conditionJson: string,
    attributes: Record<string, string>,
  ): boolean {
    let condition: Record<string, unknown>;
    try {
      condition = JSON.parse(conditionJson);
    } catch {
      return false; // malformed condition fails safe — never grants access
    }

    return Object.entries(condition).every(
      ([path, expected]) => attributes[path] === expected,
    );
  }

  private describeDecision(applicable: MatchedPolicy[], allowed: boolean): string {
    if (applicable.length === 0) return 'no matching policy (default deny)';
    const names = applicable.map((p) => p.name).join(', ');
    return allowed ? `allowed by policy: ${names}` : `denied by policy: ${names}`;
  }

  private writeAccessLogs(rows: (typeof accessLogsTable.$inferInsert)[]): void {
    if (rows.length === 0) return;
    void this.db
      .insert(accessLogsTable)
      .values(rows)
      .catch((error: unknown) => {
        console.error('Failed to write access log:', error);
      });
  }
}
