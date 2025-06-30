import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./user";

export const discussion = pgTable(
  "discussions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => user.id, {onDelete:"cascade"}).notNull(),

    title: text("title").notNull(),
    description: text("description").notNull(),
    tags: text("tags").array().default([]),

    commentsCount: integer("comments_count").default(0),
    upvotes: integer("upvotes").default(0),
    views: integer("views").default(0),

    ...timestamps,
  },
  (table) => [
    {
      uniqueUserTitle: uniqueIndex("unique_user_title").on(table.userId, table.title),
    },
  ]
);


