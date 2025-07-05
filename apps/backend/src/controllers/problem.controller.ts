import { db, eq, problems } from "@repo/drizzle";
import {
  ApiResponse,
  asyncHandler,
  CustomError,
  logger,
  UserRole,
} from "@repo/utils";
import {
  handleZodError,
  parseUuid,
  validateProblemData,
  validateUpdateProblemData,
} from "@repo/zod";
import { Request, RequestHandler, Response } from "express";
import { validateRefSolution } from "../utils/judge0/validateRefSolutions";

export const createProblem: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;
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
    if (existing)
      throw new CustomError(409, "Problem already exists with the same title");

    referenceSolutions.map((refSol) => {
      validateRefSolution(refSol.language, refSol.solution, testcases);
    });

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
      })
      .returning();

    logger.info(`Problem '${problem!.title}' created by user ${userId}`);
    res.status(201).json(
      new ApiResponse(201, "Problem created successfully", {
        id: problem!.id,
        title: problem!.title,
      })
    );
  }
);

export const updateProblem: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;
    parseUuid(problemId, "Problem");

    const payload = handleZodError(validateUpdateProblemData(req.body));

    if (payload.referenceSolutions && payload.testcases) {
      for (const { language, solution } of payload.referenceSolutions) {
        await validateRefSolution(language, solution, payload.testcases);
      }
    } else if (payload.referenceSolutions || payload.testcases) {
      throw new CustomError(
        400,
        "Either referenceSolutions Or testcases are missing"
      );
    }

    const [updatedProblem] = await db
      .update(problems)
      .set({ ...payload })
      .where(eq(problems.id, problemId!))
      .returning();

    logger.info(`Problem with ID ${problemId} updated successfully`);

    res.status(200).json({
      message: "Problem updated successfully",
      data: updateProblem,
    });
  }
);

export const deleteProblem: RequestHandler = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) throw new CustomError(404, "problemId is required");
  parseUuid(problemId, "Problem");
  const deletedProblem = await db
    .delete(problems)
    .where(eq(problems.id, problemId));
  res
    .status(200)
    .json(new ApiResponse(200, "Problem deleted successfully", deletedProblem));
});

export const getAllProblems: RequestHandler = asyncHandler(async (req, res) => {
  const allProblems = await db.select().from(problems);
  if (!allProblems) throw new CustomError(400, "problems does not exists");
  return res
    .status(200)
    .json(new ApiResponse(200, "problems Retrieved", allProblems));
});

export const getProblemById: RequestHandler = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) throw new CustomError(404, "problemId is required");
  parseUuid(problemId, "Problem");
  const [problem] = await db
    .select()
    .from(problems)
    .where(eq(problems.id, problemId));
  if (!problem) throw new CustomError(404, "problem does not exists");
  res.status(200).json(new ApiResponse(200, "problem Retrieved", problem));
});

