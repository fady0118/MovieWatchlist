import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user_Id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
}
