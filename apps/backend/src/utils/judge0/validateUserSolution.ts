import { CustomError } from "@repo/utils";
import { createBatchSubmissions } from "./apis/createBatchSubmissions";
import { pollSubmissionBatchResult } from "./apis/pollSubmissionBatch";
import { getLanguageIdByName } from "./utils";

export const validateRefSolution = async (
  language: string,
  solution: string,
  testcases: { input: string; output: string }[]
)  => {
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


   let allPassed = true;

    // results ki details nikal do details ka array banao
    const detailedResults = results.map((result, i) => {
      const actual = result.stdout?.trim() || "";
      const expected = testcases[i]!.output;
      const passed = actual === expected;

      // In case koi test case failed ho jae toh allPassed false ho jayega
      if (!passed) allPassed = false;

      console.log("actual = ", actual);
      console.log("expected = ", expected);

      return {
        testCase: i + 1,
        passed: passed,
        stdout: result.stdout,
        stderr: result.stderr,
        userOutput: actual,
        expectedOutput: expected,
        input: testcases[i]?.input,
        time: result.time,
        memory: result.memory,
        message: result.message,
        compile_output: result.compile_output,
        error: result.stderr,
        status: result.status,
      };
    });

    // results details ke array mai se testCaseResults banao
   return detailedResults;

    console.log("Submission Accepted")
  } catch (error) {
    throw new CustomError(500, "Failed to validate reference solution");
  }
};
