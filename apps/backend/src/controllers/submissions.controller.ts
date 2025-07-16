import { and, count, db, eq, submission } from "@repo/drizzle";
import { ApiResponse, asyncHandler, CustomError } from "@repo/utils";
import { RequestHandler } from "express";

export const getAllUserSubmission: RequestHandler = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;

    const submissions = await db
      .select()
      .from(submission)
      .where(eq(submission.userId, userId));

    res
      .status(200)
      .json(
        new ApiResponse(200, "Submissions Retrieved Successfully", submissions)
      );
  }
);

export const getUserSubmissionsForProblem: RequestHandler = asyncHandler(
  async (req, res) => {
    const userId = req.user.id;
    const problemId = req.params.problemId;
    if (!problemId) {
      throw new CustomError(400, "Problem ID is required");
    }

    const submissions = await db
      .select()
      .from(submission)
      .where(
        and(eq(submission.userId, userId), eq(submission.problemId, problemId))
      );

    res
      .status(200)
      .json(
        new ApiResponse(200, "Submissions Retrieved Successfully", submissions)
      );
  }
);

export const getAllSubmissionsForProblem: RequestHandler = asyncHandler(
  async (req, res) => {
    const problemId = req.params.problemId;
    if (!problemId) throw new CustomError(400, "Problem ID is required");

    const [submissionCount] = await db
      .select({ count: count() })
      .from(submission)
      .where(eq(submission.problemId!, problemId));

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Submissions Retrieved Successfully",
          submissionCount!.count
        )
      );
  }
);
