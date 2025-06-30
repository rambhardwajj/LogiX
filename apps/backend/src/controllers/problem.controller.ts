import { asyncHandler } from "@repo/utils";
import { Request, RequestHandler, Response } from "express";

export const createProblem: RequestHandler  = asyncHandler(async ( req: Request, res: Response) => {
    const {id: userId, role : userRole} = req.user  
})