// Authentication Routes
import { Router } from "express";
import { registerController, loginController, logoutController, removeUser } from "../../controllers/authController.js";
import authMiddleware from '../../middleware/authmiddleware.js'
const router = Router();

// Register User
router.post("/register", registerController);
// Login User
router.post("/login", loginController);
// Logout User
router.post("/logout", logoutController);
// remove user
router.delete("/remove", authMiddleware, removeUser);
export default router;
