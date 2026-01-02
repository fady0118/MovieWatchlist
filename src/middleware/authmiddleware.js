import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";

export default async function authenticate(req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.JWT) {
      token = req.cookies.JWT;
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided!" });
    }
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check that user exists in the db
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.user_Id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // add user to the req
    req.user = user;

    // proceed to the crud controller
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
