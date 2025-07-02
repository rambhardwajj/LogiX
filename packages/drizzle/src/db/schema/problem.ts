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
import {users} from "./user"
import { Difficulty } from "@repo/utils";

export const difficultyEnum = pgEnum("difficulty", Difficulty);

export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").unique().notNull(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),

  tags: text("tags").array().notNull(),
  demo: boolean("demo").default(false),
  userId: uuid("user_id").references(()=> users.id , {onDelete: "cascade"}).notNull(),

  examples: json("examples").notNull(),
  constraints: text("constraints").notNull(),

  hints: text("hints"),
  editorial: text("editorial"),

  testcases: json("testcases").notNull(),
  codeSnippets: json("code_snippets").notNull(),
  referenceSolutions: json("reference_solutions").notNull(),

  ...timestamps,
});
