import express from "express";
import authMiddleware, { authorizeRoles } from "../middleware/authMiddleware.js";
import { postJob, getJobs, searchJobs } from "../controllers/jobController.js";

const router = express.Router();

// Only employers and admins can post jobs
router.post(
  "/post-job",
  authMiddleware,
  authorizeRoles("employer", "admin"),
  postJob
);

// Public routes
router.get("/all-jobs", getJobs);
router.get("/search", searchJobs);

export default router;
