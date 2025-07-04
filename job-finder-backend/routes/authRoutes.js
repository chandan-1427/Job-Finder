import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadProfilePic from "../middleware/profilePic.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", authMiddleware, getProfile);
router.get("/check-auth", authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});
router.put("/update-profile", authMiddleware, updateProfile);

// Profile picture upload/delete routes
router.post(
  "/upload-profile-picture",
  authMiddleware,
  uploadProfilePic.single("profileImage"),
  uploadProfilePicture
);

router.delete("/delete-profile-picture", authMiddleware, deleteProfilePicture);

export default router;
