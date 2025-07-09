import { Router } from "express";
import {
  forgotPassword,
  googleLogin,
  login,
  logout,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller";
import { isLoggedIn } from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verify-email", resendVerificationEmail);
router.post("/forgotpassword", forgotPassword);
router.post("/login/google", googleLogin);

export default router;
