// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path as needed

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user details (without password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // attach user info including role

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ error: "Invalid Token" });
  }
};

// Role-based authorization middleware generator
// Usage: app.get('/admin', authMiddleware, authorizeRoles('admin'), handler)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized - no user" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden - insufficient role" });
    }
    next();
  };
};

export default authMiddleware;
