import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller";
import { forgotPassword, login, logout, register, resendVerificationEmail, verifyEmail } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login)
router.get("/logout", logout);
router.get("/verify-email/:token", verifyEmail)
router.post("/resend-verify-email", resendVerificationEmail)
router.post("/forgotpassword", forgotPassword)

export default router;