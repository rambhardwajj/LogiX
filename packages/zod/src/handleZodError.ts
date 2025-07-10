import { SafeParseReturnType } from "zod";
import { CustomError } from "@repo/utils";

export const handleZodError = <T>(
  result: SafeParseReturnType<unknown, T>
): T => {
  console.log('Inside Handlezod error')
  if (!result.success) {
    
    console.log('result, ', result)
    const firstIssue = result.error.issues[0];
    const path = firstIssue?.path.join(".");

    if (
      firstIssue?.code === "invalid_type" &&
      firstIssue.received === "undefined"
    ) {
      throw new CustomError(
        400,
        path ? `Missing '${path}' field` : "Missing required fields"
      );
    }

    const message = path ? firstIssue?.message : firstIssue?.message;
    throw new CustomError(422, message!);
  }
  return result.data;
};