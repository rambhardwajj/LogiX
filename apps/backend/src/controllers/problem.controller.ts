import {
  db,
  eq,
  problemInPlaylist,
  problems,
  problemSolved,
  users,
} from "@repo/drizzle";
import {
  ApiResponse,
  asyncHandler,
  CustomError,
  logger,
  UserRole,
  omitUndefined,
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

    await Promise.all(
      referenceSolutions.map(({ language, solution }) =>
        validateRefSolution(language, solution, testcases)
      )
    );

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

    const updatePayload = omitUndefined(payload);

    if (updatePayload.referenceSolutions && updatePayload.testcases) {
      for (const { language, solution } of updatePayload.referenceSolutions) {
        await Promise.all(
          updatePayload.referenceSolutions.map(({ language, solution }) =>
            validateRefSolution(language, solution, updatePayload.testcases!)
          )
        );
      }
    } else if (updatePayload.referenceSolutions || updatePayload.testcases) {
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
      data: updatedProblem,
    });
  }
);

export const deleteProblem: RequestHandler = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) throw new CustomError(404, "problemId is required");
  parseUuid(problemId, "Problem");

  const [deletedProblem] = await db
    .delete(problems)
    .where(eq(problems.id, problemId))
    .returning();

  res
    .status(200)
    .json(new ApiResponse(200, "Problem deleted successfully", deletedProblem));
});

export const getAllProblems: RequestHandler = asyncHandler(async (req, res) => {
  console.log("inside getAll");
  const allProblems = await db.select().from(problems);
  return res
    .status(200)
    .json(new ApiResponse(200, "Problems Retrieved", allProblems));
});

export const getProblemById: RequestHandler = asyncHandler(async (req, res) => {
  console.log("Inside get problem by id");
  const { problemId } = req.params;
  if (!problemId) throw new CustomError(404, "ProblemId is required");
  parseUuid(problemId, "Problem");
  const [problem] = await db
    .select()
    .from(problems)
    .where(eq(problems.id, problemId));

  if (!problem) throw new CustomError(404, "Problem does not exists");
  res.status(200).json(new ApiResponse(200, "Problem Retrieved", problem));
});

export const getSolvedProblems: RequestHandler = asyncHandler(
  async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      throw new CustomError(400, "invalid user Id");
    }

    const solvedProblems = await db
      .select()
      .from(problemSolved)
      .where(eq(users.id, userId));
    return res
      .status(200)
      .json(new ApiResponse(200, "Solved Problems Retrieved", solvedProblems));
  }
);
