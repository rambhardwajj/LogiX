import { Router } from "express";
import {
  forgotPassword,
  getUserProfile,
  googleLogin,
  login,
  logout,
  refreshToken,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller";
import { isLoggedIn } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router: Router = Router();

router.post("/register",upload.fields([{ name: "avatar", maxCount: 1 }]), register);
router.post("/login", login);
router.get("/profile", isLoggedIn, getUserProfile);
router.get("/logout", isLoggedIn, logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verify-email", resendVerificationEmail);
router.post("/forgotpassword", forgotPassword);
router.post("/login/google", googleLogin);
router.get("/refresh-token", isLoggedIn,  refreshToken);

export default router;
