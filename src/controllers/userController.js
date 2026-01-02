import { prisma } from "../prismaClient.js";
import bcrypt from "bcrypt";

const updateUserController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const data = { email, username };
    if(password){
        data.password = await bcrypt.hash(password,10)
    }
    const updatedUser = await prisma.user.update({
        where:{
            id:req.user.id
        },
        data
    })
    const {password:_, ...safeUser} = updatedUser;
    res.status(200).json({ message: "user data updated", updatedUser: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// when a user is deleted we change the createdBy value to user 0 (deleted user)
// only the user himself can delete his account
const removeUserController = async (req, res) => {
  try {
    // the user must re-enter their password to delete his account
    const {password} = req.body
    const passwordMatch = await bcrypt.compare(password, req.user.password)
    if(!passwordMatch){
      return res.status(401).json({message:"Invalid credentials"})
    }
    // userId from the middleware is the user making the req to delete his account
    const userId = req.user.id;
    // we need to protect (deleted user) from any deletion attempts
    if (userId === process.env.DELETED_USER_ID) {
      throw new Error("System user cannot be deleted");
    }
    // before we delete we should transaction movies created by him to (deletedUser)
    await prisma.$transaction([
      prisma.movie.updateMany({
        where: {
          createdBy: userId,
        },
        data: {
          createdBy: process.env.DELETED_USER_ID,
        },
      }),
    ]);
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: `${deletedUser.username} successfully removed!` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { updateUserController, removeUserController };
