import {
  pgTable,
  uuid,
  text,
  boolean,
  json,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper"; // assuming this adds createdAt & updatedAt
import { user } from "./user.schema";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const playlist = pgTable(
  "playlists",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    userId: uuid("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),

    visibilty: boolean("visibilty").default(false),
    type: text("type").default("private"),
    ...timestamps,
  },
  (table) => [
    {
      uniqueUserPlaylist: uniqueIndex("unique_user_playlist").on(
        table.userId,
        table.name
      ),
    },
  ]
);
