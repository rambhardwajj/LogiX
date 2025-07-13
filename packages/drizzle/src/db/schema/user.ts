import {
  pgTable,
  integer,
  text,
  boolean,
  uuid,
  pgEnum,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { InferSelectModel } from "drizzle-orm";

import { UserRole, AuthProvider } from "@repo/utils";


export const roleEnum = pgEnum("role", UserRole);
export const providerEnum = pgEnum("provider", AuthProvider);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  
  linkedInUrl: varchar("linkedInUrl").default("https://www.linkedin.com/"),
  xUrl: varchar("xUrl").default("https://x.com/"),
  githubUrl: varchar("githubUrl").default("https://github.com/"),

  fullname: varchar("fullname").notNull(),
  email: varchar("email").unique().notNull(),
  isVerified: boolean("is_verified").default(false),
  avatar: text("avatar").default(
    "https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png"
  ),
  role: roleEnum("role").default("USER"),
  passwordHash: text("password_hash"),
  provider: providerEnum("provider").default("LOCAL"),

  dailyProblemStreak: integer("daily_problem_streak").default(0),
  isStreakMaintained: boolean("is_streak_maintained").default(false),
  lastSubmissionDate: timestamp("last_submission_date"),
  problemSolvedCount: integer("problem_solved_count").default(0),

  forgotPasswordToken: text("forgot_password_token"),
  forgotPasswordExpiry: timestamp("forgot_password_expiry"),
  verificationToken: text("verification_token"),
  verificationTokenExpiry: timestamp("verification_token_expiry"),

  refreshToken: text("refresh_token"),

  ...timestamps,
});

export type User = InferSelectModel<typeof users>;
