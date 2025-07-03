import { z } from "zod";
import { logger } from "@repo/utils";
import path from "path";
import { configDotenv } from "dotenv";

export enum NodeEnv {
  Development = "development",
  Production = "production",
}

configDotenv({ path: path.resolve(__dirname, "../../../.env") });

const envSchema = z.object({
  PORT: validNumber("PORT"),
  DATABASE_URL: validURL("DATABASE_URL"),
  ACCESS_TOKEN_SECRET: nonEmptyString("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: nonEmptyString("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_SECRET: nonEmptyString("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: nonEmptyString("REFRESH_TOKEN_EXPIRY"),
  REFRESH_TOKEN_EXPIRY_REMEMBER_ME: nonEmptyString(
    "REFRESH_TOKEN_EXPIRY_REMEMBER_ME"
  ),

  CLOUDINARY_NAME: nonEmptyString("CLOUDINARY_NAME"),
  CLOUDINARY_API_KEY: nonEmptyString("CLOUDINARY_API_KEY"),
  CLOUDINARY_SECRET_KEY: nonEmptyString("CLOUDINARY_SECRET_KEY"),

  SERVER_URL: validURL("SERVER_URL"),
  CLIENT_URL: validURL("CLIENT_URL"),

  RESEND_API_KEY: nonEmptyString("RESEND_API_KEY"),

  RESEND_SENDERMAIL: nonEmptyString("RESEND_SENDERMAIL"),

  NODE_ENV: z.nativeEnum(NodeEnv, {
    errorMap: () => {
      return { message: "NODE_ENV must be 'development' or 'production" };
    },
  }),

  // GOOGLE_CLIENT_ID: nonEmptyString("GOOGLE_CLIENT_ID"),
  // GEMINI_API_KEY: nonEmptyString("GEMINI_API_KEY"),

  JUDGE0_API_URL: nonEmptyString("JUDGE0_API_URL"),
  JUDGE0_API_KEY: nonEmptyString("JUDGE0_API_KEY"),

  REDIS_HOST: nonEmptyString("REDIS_HOST"),
  REDIS_PORT : validNumber("PORT"),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const messages = result.error.errors
      .map((err) => `- ${err.message}`)
      .join("\n");

    logger.error(`Environment variable validation failed\n${messages}`);
    process.exit(1);
  }

  return result.data;
};

export const env = createEnv(process.env);

function validNumber(name: string) {
  return z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a number`,
    })
  );
}

function validURL(name: string) {
  return z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a valid URL string`,
    })
    .url(`${name} must be a valid URL`);
}

function nonEmptyString(name: string) {
  return z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a string`,
    })
    .nonempty(`${name} cannot be empty`);
}