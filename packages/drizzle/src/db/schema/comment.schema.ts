import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./user.schema";
import { discussion } from "./discuss.schema";

export const comment = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  discussId: uuid("discuss_id").references(()=> discussion.id, {onDelete:"cascade"}).notNull(),
  userId: uuid("user_id").references(() => user.id, {onDelete:"cascade"}).notNull(),

  comment: text("comment").notNull(),
  upvote: integer("upvote").default(0),

  ...timestamps,
});