import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./user";
import { comment } from "./comment";

export const commentUpvote = pgTable(
  "comment_upvotes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(()=> user.id, {onDelete: "cascade"}).notNull(),
    commentId: uuid("comment_id").references(() => comment.id, {onDelete:"cascade"}).notNull(),
  },
  (table) => [
    {
      uniqueUserComment: unique().on(table.userId, table.commentId),
    },
  ]
);
