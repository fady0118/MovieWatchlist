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

export { registerController, loginController, logoutController };
