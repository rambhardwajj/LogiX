import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  created_at: timestamp().defaultNow().notNull(),
};