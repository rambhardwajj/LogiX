import {
  pgTable,
  uuid,
  text,
  boolean,
  json,
  timestamp,
  pgEnum
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper"; // assuming this adds createdAt & updatedAt
import {user} from "./user.schema"
import { uniqueIndex } from "drizzle-orm/pg-core";
import { playlist } from "./playlist.schema";
import { problem } from "./problem.schema";


export const problemInPlaylist = pgTable("problems_in_playlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  playListId: uuid("playlist_id").references(() => playlist.id, {onDelete:'cascade'}).notNull(),
  problemId: uuid("problem_id").references(() => problem.id, {onDelete:"cascade"}).notNull(),

  ...timestamps,
}, (table) => ({
  uniqueProblemPlaylist: uniqueIndex("unique_problem_playlist").on(table.playListId, table.problemId),
}));