import express from "express";
import { registerUser, loginUser, verifyOtp } from "../controllers/user.controller.js";
import { loginLimiter, otpLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.post("/register", otpLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/verify-otp", otpLimiter, verifyOtp);

export default router;
