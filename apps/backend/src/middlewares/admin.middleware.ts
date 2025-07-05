import { asyncHandler, CustomError } from "@repo/utils";
import { RequestHandler } from "express";


export const isAdmin:RequestHandler = asyncHandler(async (req, res, next) => {
  const { role } = req.user;

  if (role !== "ADMIN") {
    throw new CustomError(403, "Access denied. Admins only.");
  }

  next();
});