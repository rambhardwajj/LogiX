import {
  db,
  eq,
  problems,
  problemSolved,
  submission,
  testCaseResult,
} from "@repo/drizzle";
import { ApiResponse, asyncHandler, CustomError } from "@repo/utils";
import { executeCodeSchemaValidation, handleZodError } from "@repo/zod";
import { RequestHandler } from "express";
import { testcaseSchema } from "@repo/zod";
import {
  createBatchSubmissions,
  getLanguageIdByName,
  pollSubmissionBatchResult,
  validateRefSolution,
} from "../utils/judge0";

enum ExecutionTypeEnum {
  RUN = "run",
  SUBMIT = "submit",
}

export const executeCode: RequestHandler = asyncHandler(async (req, res) => {
  let {
    source_code,
    language,
    stdin = [],
  } = handleZodError(executeCodeSchemaValidation(req.body));

  const { problemId, executionType } = req.params;
  const userId = req.user.id;

  if (!problemId || !userId) throw new CustomError(400, "Invalid request");

  if (
    executionType !== ExecutionTypeEnum.RUN &&
    executionType !== ExecutionTypeEnum.SUBMIT
  )
    throw new CustomError(400, "Invalid execution type");

  const [currProblem] = await db
    .select()
    .from(problems)
    .where(eq(problems.id, problemId));

  if (!currProblem) throw new CustomError(404, "Problem not found");

  // ________________________________________________________________________

  // handle submit
  if (executionType === ExecutionTypeEnum.SUBMIT) {
    // parse test case ( idk why )
    const parsed = testcaseSchema.safeParse(currProblem.testcases);
    if (!parsed.success)
      throw new CustomError(500, "Invalid testcases format in DB");

    // test cases ka array
    const testcases = parsed.data;

    // inputs and outputs nikal lo
    const inputs = testcases.map((tc) => tc.input);
    const expectedOutputs = testcases.map((tc) => tc.output.trim());

    const languageId = getLanguageIdByName(language);

    // submissions ke liye array of input output language and code bana do
    const submissions = testcases.map(
      (testCase: { input: string; output: string }) => {
        return {
          stdin: testCase.input,
          expected_output: testCase.output,
          language_id: languageId,
          source_code: source_code,
        };
      }
    );

    // judge0 ko submissions bhej do and tokens lelo tokens ko judge0 ko deke results lelo
    const tokens = await createBatchSubmissions(submissions);
    const results = await pollSubmissionBatchResult(tokens);

    // submission saving logic
    let allPassed = true;

    // results ki details nikal do details ka array banao
    const detailedResults = results.map((result, i) => {
      const actual = result.stdout?.trim() || "";
      const expected = expectedOutputs[i];
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
        input: inputs[i],
        time: result.time,
        memory: result.memory,
        message: result.message,
        compile_output: result.compile_output,
        error: result.stderr,
        status: result.status,
      };
    });

    // Submission Table mai new entry kr do
    const [createdSubmission] = await db
      .insert(submission)
      .values({
        userId,
        problemId,
        sourceCode: source_code,
        language: language,
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r: any) => r.stdout)),
        stderr: detailedResults.some((r: any) => r.stderr)
          ? JSON.stringify(detailedResults.map((r: any) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r: any) => r.compile_output)
          ? detailedResults.map((r: any) => r.compile_output).join("\n")
          : null,
        status: allPassed === true ? "Accepted" : "Wrong Answer",
        memory: (
          detailedResults.reduce(
            (acc: number, r: any) => acc + (r.memory || 0),
            0
          ) / detailedResults.length
        ).toString(),

        time: detailedResults.some((r: any) => r.time)
          ? JSON.stringify(detailedResults.map((r: any) => r.time))
          : null,
      })
      .returning();

    if (!createdSubmission)
      throw new CustomError(400, "Submission creation failed");

    // If all passed then insert ProblemSolved Table
    if (allPassed) {
      await db
        .insert(problemSolved)
        .values({ userId, problemId })
        .onConflictDoNothing();
    }

    // You might need to extract `id` if createdSubmission is returned as an array
    const submissionId = Array.isArray(createdSubmission)
      ? createdSubmission[0].id
      : createdSubmission.id;

    //  testCase results banao and db mai dal do 
    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submissionId as string,
      noOfTestCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expectedOutput!,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status.description,
      memory: result.memory.toString(),
      time: result.time,
    }));

    await db.insert(testCaseResult).values(testCaseResults);

    const message =
      allPassed === true ? "Submission successfull" : "Submission failed";

    
    const submissionRecord = await db
      .select()
      .from(submission)
      .where(eq(submission.id, submissionId));

    const relatedTestCases = await db
      .select()
      .from(testCaseResult)
      .where(eq(testCaseResult.submissionId, submissionId));

    const submissionWithTestCase = {
      ...submissionRecord[0],
      testCases: relatedTestCases,
    };

    
  }
});
