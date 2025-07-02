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
import { users } from "./user";
import { problems } from "./problem";

export const problemSolved = pgTable(
  "problems_solved",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    problemId: uuid("problem_id").references(()=> problems.id, {onDelete: "cascade"}).notNull(),

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
