import { z } from "zod";
import { logger } from "@repo/utils";
import {config } from "dotenv"
import path from "path";

config( { path: path.join(process.cwd() , ".env") } );

export const envSchema = z.object({

  DATABASE_URL: z.string(),

  // MAILTRAP_SMTP_HOST: z.string().min(1, "MAILTRAP_SMTP_HOST is required"),
  // MAILTRAP_SMTP_PORT: z.coerce.number().int().positive(),
  
  // MAILTRAP_SMTP_USER: z.string().min(1),
  // MAILTRAP_SMTP_PASS: z.string().min(1),

  // MAIL_FROM: z.string().email("MAIL_FROM must be a valid email"),

  // RESEND_API_KEY: z.string().min(1),
  // MAX_ATTACHMENTS: z.coerce.number().int().nonnegative(),

  // ACCESS_TOKEN_SECRET: z.string().min(1),
  // REFRESH_TOKEN_SECRET: z.string().min(1),

  // CLOUDINARY_CLOUD_NAME: z.string().min(1),
  // CLOUDINARY_API_KEY: z.string().min(1),
  // CLOUDINARY_API_SECRET: z.string().min(1),

  // JUDGE0_API_URL: z.string().url(),
  // JUDGE0_API_KEY: z.string().min(1),

  // GOOGLE_CLIENT_ID: z.string().min(1),
  // GEMINI_API_KEY: z.string().min(1),
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

