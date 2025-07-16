import { Router } from "express"
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { isLoggedIn } from "../middlewares/auth.middleware";

const router:Router = Router();

router.post('/create',isLoggedIn, isAdmin , createProblem)
router.patch('/update/:problemId',isLoggedIn, isAdmin , updateProblem)
router.delete('/delete/:problemId',isLoggedIn, isAdmin , deleteProblem)
router.get('/get/:problemId',  getProblemById)
router.get("/all", getAllProblems)

export default router;