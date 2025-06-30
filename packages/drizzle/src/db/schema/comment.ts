import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { users } from "./user";
import { discussion } from "./discussion";

export const comment = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  discussId: uuid("discuss_id").references(()=> discussion.id, {onDelete:"cascade"}).notNull(),
  userId: uuid("user_id").references(() => users.id, {onDelete:"cascade"}).notNull(),

  comment: text("comment").notNull(),
  upvote: integer("upvote").default(0),

  ...timestamps,
});