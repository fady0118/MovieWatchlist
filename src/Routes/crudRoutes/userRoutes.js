import { Router } from "express";
import { updateUserController, removeUserController } from "../../controllers/userController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { updateUserSchema, removeUserSchema } from "../../validators/userValidators.js";

const router = Router();
// a user may update their username or password or migrate their email or delete their account
// update user
router.patch("/update", validateRequest(updateUserSchema), updateUserController);
// remove user
router.delete("/remove", validateRequest(removeUserSchema), removeUserController);

export default router;
