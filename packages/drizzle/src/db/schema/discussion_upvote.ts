import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./user.schema";
import { discussion } from "./discuss.schema";

export const discussionUpvote = pgTable(
  "discussion_upvotes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(()=> user.id, {onDelete:"cascade"}).notNull(),
    discussionId: uuid("discussion_id").references( () => discussion.id, {onDelete:"cascade"}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    {
      uniqueUserDiscussion: uniqueIndex().on(table.userId, table.discussionId),
    },
  ]
);
