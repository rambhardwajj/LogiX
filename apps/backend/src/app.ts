import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "@repo/zod";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [env.CLIENT_URL, "http://localhost:5173" ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new CustomError(400, "Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const PORT = env.PORT

import authRouter  from "./routes/auth.route";
import { CustomError } from "@repo/utils";

app.use("api/v1/auth", authRouter)

export default app;
