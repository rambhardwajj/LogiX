import { CustomError } from "@repo/utils";
import { env } from "@repo/zod";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { decodedUser } from "../types";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new CustomError(400, "Invalid Access Token");

  try {
    const decodedUser = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
    req.user = decodedUser as decodedUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new CustomError(401, error.name);
    }
    throw new CustomError(401, "Invalid or expired access token");
  }
};
