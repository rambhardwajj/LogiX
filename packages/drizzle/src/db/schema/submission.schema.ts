import {
  pgTable, uuid, text, boolean, json, timestamp
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import {user} from "./user.schema"
import { problem } from "./problem.schema";

export const submission = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(()=> user.id, {onDelete:"cascade"}).notNull(),
  problemId: uuid("problem_id").references(() => problem.id, {onDelete: "cascade"}).notNull(),

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