import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller";

const router: Router = Router();

router.get("/register", healthCheck);

export default router;