// Authentication Routes
import { Router } from "express";
import { registerController, loginController, logoutController } from "../../controllers/authController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginSchema, registerSchema } from "../../validators/authValidators.js";

const router = Router();

// Register User
router.post("/register", validateRequest(registerSchema), registerController);
// Login User
router.post("/login", validateRequest(loginSchema), loginController);
// Logout User
router.post("/logout", logoutController);

export default router;
