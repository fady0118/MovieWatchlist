import { Router } from "express";

const router = Router();

// we need to protect user 0 (deleted user) from any deletion attempts
    // if (userIdToDelete === process.env.DELETED_USER_ID) {
    //   throw new Error("System user cannot be deleted");
    // }

export default router;
