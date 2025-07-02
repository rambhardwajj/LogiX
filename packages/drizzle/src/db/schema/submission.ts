import {
  pgTable, uuid, text, boolean, json, timestamp
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import {users} from "./user"
import { problems } from "./problem";

export const submission = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(()=> users.id, {onDelete:"cascade"}).notNull(),
  problemId: uuid("problem_id").references(() => problems.id, {onDelete: "cascade"}).notNull(),

  sourceCode: json("source_code").notNull(),
  language: text("language").notNull(),
  stdin: text("stdin"),
  stdout: text("stdout"),
  stderr: text("stderr"),
  compileOutput: text("compile_output"),
  status: text("status").notNull(), // Consider enum if values are fixed

  memory: text("memory"),
  time: text("time"),

  ...timestamps,
});