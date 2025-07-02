import { ApiResponse, asyncHandler, CustomError, logger } from "@repo/utils";
import { handleZodError, validateRegister } from "@repo/zod";
import { Request, RequestHandler, Response } from "express";
import { users, eq, db } from "@repo/drizzle";
import { generateToken, hashPassword } from "../utils/auth";

export const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullname, email, password } = handleZodError(
      validateRegister(req.body)
    );

    logger.info("Registration request received by", { email, ip: req.ip });

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) throw new CustomError(409, "user already exists");

    const hashedPassword = await hashPassword(password);
    const { unHashedToken, hashedToken, tokenExpiry } = generateToken();

    const user = await db
      .insert(users)
      .values({
        email: email,
        password: hashedPassword,
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: tokenExpiry,
      });

      res.status(200).json(new ApiResponse(200, "Registration successful", user));
  }
);
