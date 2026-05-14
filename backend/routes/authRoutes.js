import express from "express";
import { signupUser, loginUser, signupDeveloper } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /auth/signup/user
router.post("/signup/user", signupUser);

// POST /auth/signup/developer 
router.post("/signup/developer", signupDeveloper);

// POST /auth/login
router.post("/login", loginUser);

export default router;