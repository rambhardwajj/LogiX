import { db, eq, problems } from "@repo/drizzle";
import { ApiResponse, asyncHandler, CustomError, logger, UserRole } from "@repo/utils";
import { handleZodError, validateProblemData } from "@repo/zod";
import { Request, RequestHandler, Response } from "express";
import { validateRefSolution } from "../utils/judge0/validateRefSolutions";

export const createProblem: RequestHandler  = asyncHandler(async ( req: Request, res: Response) => {
    const {id: userId, role : userRole} = req.user
    
    if (userRole !== UserRole.admin) {
    throw new CustomError(403, "You are not authorized to create a problem");
  }

    const {
    title,
    description,
    difficulty,
    tags,
    demo,
    examples,
    constraints,
    hints,
    editorial,
    codeSnippets,
    referenceSolutions,
    testcases,
    
  } = handleZodError(validateProblemData(req.body));

  const [existing] = await db
    .select()
    .from(problems)
    .where(eq(problems.title, title));

  if (existing) {
    throw new CustomError(409, "Problem already exists with the same title");
  }

  referenceSolutions.map((refSol) => {
    validateRefSolution(refSol.language, refSol.solution, testcases)
  })

    const [problem] = await db
    .insert(problems)
    .values({
      title,
      description,
      difficulty,
      tags,
      demo,
      createdBy: userId,
      examples,
      constraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolutions,
    }).returning()

    logger.info(`Problem '${problem!.title}' created by user ${userId}`);

  res.status(201).json(
    new ApiResponse(201, "Problem created successfully", {
      id: problem!.id,
      title: problem!.title,
    })
  );

})