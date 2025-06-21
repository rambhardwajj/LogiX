import {
  pgTable,
  uuid,
  text,
  boolean,
  json,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { user } from "./user.schema";
import { problem } from "./problem.schema";

export const problemSolved = pgTable(
  "problems_solved",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade"}).notNull(),
    problemId: uuid("problem_id").references(()=> problem.id, {onDelete: "cascade"}).notNull(),

    ...timestamps,
  },
  (table) => [
    {
      uniqueUserProblem: uniqueIndex("unique_user_problem").on(
        table.userId,
        table.problemId
      ),
    },
  ]
);
