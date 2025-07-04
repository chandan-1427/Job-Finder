import express from "express";
import {
  getPendingEmployers,
  approveEmployer,
  rejectEmployer,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin); 
router.post("/logout", isAdmin, logoutAdmin);
router.get("/pending-employers", isAdmin, getPendingEmployers);
router.patch("/approve-employer/:id", isAdmin, approveEmployer);
router.patch("/reject-employer/:id", isAdmin, rejectEmployer);

export default router;
