// bytea.ts
import { sql } from 'drizzle-orm';
import { customType } from 'drizzle-orm/pg-core';

// Drizzle expects customType with no type argument for custom runtime types
export const bytea = customType({
  dataType() {
    return 'bytea';
  },
  fromDriver(value) {
    if (value instanceof Uint8Array) {
      return Buffer.from(value);
    }
    throw new Error('Expected Uint8Array from driver');
  },
  toDriver(buffer) {
    // encode buffer as base64, then decode in SQL
    const buf = buffer as Buffer;
    return sql`decode(${buf.toString('base64')}, 'base64')`;
  },
});
