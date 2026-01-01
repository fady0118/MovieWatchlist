import { Router } from "express";
import { prisma } from "../../prismaClient.js";

const router = Router();

// when a user is deleted we change the createdBy value to user 0 (deleted user)
const DELETED_USER_ID = "100cb528-a882-48c9-a8ff-f84c09cb1703"; // will be used in the delete movie api

export default router;
