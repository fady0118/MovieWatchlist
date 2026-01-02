import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
// register controller
const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (!email || !username || !password) {
      return res.status(400).json({ message: "some fields missing" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: "USER",
      },
    });
    const token = jwt.sign({ user_Id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res
      .status(201)
      .cookie("JWT", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 1 * (1000 * 60 * 60 * 24) })
      .json({ data: { user: { id: user.id, username: user.username, email: user.email }, token } });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "internal server error", error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Some fields missing" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ user_Id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res
      .status(200)
      .cookie("JWT", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 1 * (1000 * 60 * 60 * 24) })
      .json({ data: { user: { id: user.id, email: user.email }, token } });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const logoutController = async (req, res) => {
  // logout means to clear the token from the cookies
  res.cookie("JWT", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

// when a user is deleted we change the createdBy value to user 0 (deleted user)
// only the user himself can delete his account
const removeUser = async (req, res) => {
  try {
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

export { registerController, loginController, logoutController, removeUser };
