import { Router } from "express"
import { createProblem } from "../controllers/problem.controller";
import { isAdmin } from "../middlewares/admin.middleware";

const router:Router = Router();

router.post('/create', isAdmin ,  createProblem)

export default router;