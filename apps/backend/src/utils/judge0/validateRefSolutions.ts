import { CustomError } from "@repo/utils";
import { createBatchSubmissions } from "./apis/createBatchSubmissions";
import { pollSubmissionBatchResult } from "./apis/pollSubmissionBatch";
import { getLanguageIdByName } from "./utils";

export const validateRefSolution = async (
  language: string,
  solution: string,
  testcases: { input: string; output: string }[]
) => {
  const languageId = getLanguageIdByName(language);

  const submissions = testcases.map(
    (testCase: { input: string; output: string }) => {
      return {
        stdin: testCase.input,
        expected_output: testCase.output,
        language_id: languageId,
        source_code: solution,
      };
    }
  );
  try {
    const tokens = await createBatchSubmissions(submissions);

    const results = await pollSubmissionBatchResult(tokens);

    console.log(results);

    results.forEach((result, idx) => {
      if (result.status.id !== 3) {
        const errorMessage =
          result.stderr || result.compile_output || "No error output";
        throw new CustomError(
          400,
          `Submission ${idx + 1} failed: ${result.status.description} — ${errorMessage}`
        );
      }
    });

    console.log("Submission Accepted")
  } catch (error) {
    throw new CustomError(500, "Failed to validate reference solution");
  }
};
