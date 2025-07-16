import {Router} from "express";
import { isLoggedIn } from "../middlewares/auth.middleware";
import { executeCode } from "../controllers/execute.controller";

const router:Router = Router();

router.post("/:problemId/:type",isLoggedIn,executeCode)

export default router