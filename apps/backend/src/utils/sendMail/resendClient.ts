import { env } from "@repo/zod";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);