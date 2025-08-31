import express from "express";
import { rateLimiter } from "../middleware/rateLimter.js";
import { register, login, refreshAccessToken, resendVerificationEmail, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", rateLimiter, login);
router.post("/refresh-token", refreshAccessToken);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;