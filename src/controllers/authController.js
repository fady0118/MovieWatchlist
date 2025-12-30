import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
// register controller
const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userExists = await prisma.user.findUnique({ where: email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (!email || !username || !password) {
      return res.status(400).json({ message: "some fields missing" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      email,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ user_Id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(201).json({ token });
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
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { registerController, loginController };
