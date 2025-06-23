import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller";

const router:Router = Router();

router.get("/", healthCheck);

export default router;