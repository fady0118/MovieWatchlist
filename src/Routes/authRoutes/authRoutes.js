// Authentication Routes
import { Router } from "express";
import { registerController, loginController } from "../../controllers/authController.js";

const router = Router();
// Register User
router.post('/register', registerController)
// Login User
router.post("/login", loginController);

export default router;
