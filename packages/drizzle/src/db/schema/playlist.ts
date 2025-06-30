import {
  pgTable,
  uuid,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper"; // assuming this adds createdAt & updatedAt
import { users } from "./user";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const playlist = pgTable(
  "playlists",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
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
