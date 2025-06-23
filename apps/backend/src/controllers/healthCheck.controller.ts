import { Request, Response } from "express";
import { ApiResponse } from "@repo/utils";

export const healthCheck = async(req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200,   "Health check passed", null,));
};