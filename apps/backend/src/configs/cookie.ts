import { env } from "@repo/zod";
import ms, { StringValue } from "ms";

export function generateCookieOptions({ rememberMe = false }: {rememberMe?: boolean} = {}) {
  const expiry = rememberMe ? env.REFRESH_TOKEN_EXPIRY_REMEMBER_ME : env.REFRESH_TOKEN_EXPIRY;
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: ms(expiry as StringValue),
  };
}