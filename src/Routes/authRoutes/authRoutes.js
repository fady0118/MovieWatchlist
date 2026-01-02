// Authentication Routes
import { Router } from "express";
import { registerController, loginController, logoutController } from "../../controllers/authController.js";
import authMiddleware from '../../middleware/authmiddleware.js'
const router = Router();

// Register User
router.post("/register", registerController);
// Login User
router.post("/login", loginController);
// Logout User
router.post("/logout", logoutController);

export default router;
