import {
  pgTable,index,  uuid, text, integer, boolean, json, timestamp
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { submission } from "./submission";

export const testCaseResult = pgTable("test_case_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  submissionId: uuid("submission_id").references(() => submission.id, {onDelete: "cascade"} ).notNull(),

  noOfTestCases: integer("no_of_testcases").notNull(),
  passed: boolean("passed").notNull(),

  stdout: text("stdout"),
  expected: text("expected").notNull(),
  stderr: text("stderr"),
  compileOutput: text("compile_output"),
  status: text("status").notNull(),
  memory: text("memory"),
  time: text("time"),

  ...timestamps,
}, 
(table) => ({
    submissionIdx: index("submission_index").on(table.submissionId)
})
);
