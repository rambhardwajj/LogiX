import { CustomError } from "@repo/utils";
import { env } from "@repo/zod";
import { SubmissionResult, Token } from "../types";
import axios from "axios";
import { sleep } from "../utils";

export const pollSubmissionBatchResult = async (
  tokens: Token[]
): Promise<SubmissionResult[]> => {
  const interval = 1000; // polling interval in ms
  const timeout = 10000; // max time to wait in ms
  const startTime = Date.now();
  try {
    while (true) {
      const res= await axios.get<{ submissions: SubmissionResult[] }>(
        `${env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.map((t) => t.token).join(","),
            base64_encoded: false,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = res.data.submissions;
      const isAllDone = results.every((result) => result.status.id >= 3);
      if (isAllDone) return results;

      if (Date.now() - startTime > timeout) {
        throw new CustomError(
          408,
          "Polling timeout, submissions took too long"
        );
      }

      await sleep(interval);
    }
  } catch (error: any) {
    const message = error.message || "Unknown error";
    throw new CustomError(
      500,
      `Error while polling submissions result: ${message}`
    );
  }
};