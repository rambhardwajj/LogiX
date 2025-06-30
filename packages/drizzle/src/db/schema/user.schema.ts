import { integer, boolean , uuid, pgTable, text,pgEnum, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { AuthProvider, UserRole } from "@repo/utils"

export const roleEnum = pgEnum('role', UserRole);
export const providerEnum = pgEnum('provider', AuthProvider);


export const user = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey() ,
    email: text("email").notNull(),
    password: text("password"),
    fullName: text("fullName"),
    userName: text("userName"),
    avatar: text("text").default("https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png"),
    isVerified: boolean("is_verified").default(false),
    role: roleEnum("role").default("USER"),
    provider: providerEnum("provider").default("LOCAL"),
    dailyProblemStreak: integer().default(0),
    isStreakMaintained: boolean().default(false),
    lastSubmissionDate: timestamp(),
    refreshToken: text(),

    forgotPasswordToken: text("forgot_password_token"),
    forgotPasswordExpiry    : timestamp(),
    emailVerificationToken  : text("email_verification_token"),
    emailVerificationExpiry : timestamp(),
    ...timestamps
});