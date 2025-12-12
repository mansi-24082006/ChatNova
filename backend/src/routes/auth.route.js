import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// --------------------- Public Routes ---------------------
// User signup
router.post("/signup", signup);

// User login
router.post("/login", login);

// User logout
router.post("/logout", logout);

// --------------------- Protected Routes ---------------------
// Update user profile (requires auth)
router.put("/update-profile", protectRoute, updateProfile);

// Check if user is authenticated
router.get("/check", protectRoute, checkAuth);

export default router;
