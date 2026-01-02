import { Router } from "express";
import { updateUserController, removeUserController } from "../../controllers/userController.js";
const router = Router();
// a user may update their username or password or migrate their email or delete their account
// update user
router.patch("/update", updateUserController);
// remove user
router.delete("/remove", removeUserController);

export default router;
