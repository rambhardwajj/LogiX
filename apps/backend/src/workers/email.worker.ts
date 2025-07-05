import { sendResetPasswordMail, sendVerificationMail } from "../utils/sendMail";
import { Worker } from "bullmq";
import { connection } from "../configs/redis";
import { logger } from "@repo/utils";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    const {  fullname, email, token, type } = job.data;

    if (type ===   "verify") {
      await sendVerificationMail(fullname, email, token);
      logger.info("Verification email sent to", email);
    }

    if (type === "reset") {
      await sendResetPasswordMail(fullname, email, token);
      logger.info("Reset Password email sent to ", email);
    }
  },
  { connection }
);

logger.info("Email worker started and listening for jobs...");