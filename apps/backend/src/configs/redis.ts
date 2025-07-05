import { env } from "@repo/zod";
import IORedis from "ioredis";

//In order to start working with a Queue, a connection to a Redis instance is necessary.
export const connection = new IORedis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});