import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import { env } from "@repo/zod";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const PORT = env.PORT

import { healthCheck } from "./controllers/healthCheck.controller";

app.use("api/v1/health", healthCheck)

export default app;
