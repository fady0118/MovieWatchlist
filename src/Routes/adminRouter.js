import { Router } from "express";
import { prisma } from "../prismaClient.js";

const router = Router();
// promote a user to admin
router.post("/users/promote/:id", async (req, res) => {
  try {
    const promotedUserId = req.params.id;
    const promotingUser = req.user;
    if (!promotingUser || promotingUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden!" });
    }
    const promotedUser = await prisma.user.update({
      where: {
        id: promotedUserId,
      },
      data: {
        role: "ADMIN",
      },
    });
    res.status(200).json({ message: `${promotedUser.username} hsa been promoted to admin` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
export default router;
