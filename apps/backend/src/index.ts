import { configDotenv } from "dotenv";
import { connectDrizzle } from "@repo/drizzle";
import { env } from "@repo/zod";
import {logger} from "@repo/utils"
import app from "./app";

configDotenv();
console.log(env);

const connectDB = async () => {
  try {
    await connectDrizzle();
    logger.info("Connected to the database ");
  } catch (error: any) {
    logger.error("Failed to connect to the database", {
      error: error.message,
    });
    process.exit(1);
  }
};

connectDB();

app.listen(env.PORT, () => {
  console.log("Server listening on " , env.PORT)
})
