import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { uploadResume, generateResume } from "../controllers/resumeController.js";

const router = express.Router();

// Resume generation can be public or authenticated - adjust if needed
router.post("/generate", generateResume);

// Upload resume requires login
router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;
