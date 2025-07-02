import { env } from "@repo/zod";
import { Submission, Token } from "../types";
import axios from "axios";
import { CustomError } from "@repo/utils";

export const createBatchSubmissions = async (
  submissions: Submission[]
) => {
  try {
    const res = await axios.post(
      `${env.JUDGE0_API_URL}/submissions/batch`,
      { submissions },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new CustomError(500, `Submissiond Batch Creation Failed: ${error.message || "Error"}`);
  }
};


