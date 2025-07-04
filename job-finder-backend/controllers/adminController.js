import User from "../models/User.js";

// ✅ Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { login, password } = req.body;

    const admin = await User.findOne({
      $or: [{ email: login }, { username: login }],
      role: "admin"
    });

    if (!admin) {
      return res.status(403).json({ error: "Admin credentials not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(403).json({ error: "Invalid admin password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    }).json({ message: "Admin login successful!" });

  } catch (err) {
    console.error("Admin login failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ message: "Admin logged out successfully" });
};

// GET all pending employers
export const getPendingEmployers = async (req, res) => {
  try {
    const pendingEmployers = await User.find({
      role: "employer",
      "employerDetails.verified": false,
    }).select("-password");

    res.status(200).json(pendingEmployers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employers" });
  }
};

// Approve employer
export const approveEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(
      id,
      { "employerDetails.verified": true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Employer not found" });

    res.status(200).json({ message: "Employer approved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
};

// Reject employer (delete them)
export const rejectEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await User.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: "Employer not found" });

    res.status(200).json({ message: "Employer rejected and deleted" });
  } catch (err) {
    res.status(500).json({ error: "Rejection failed" });
  }
};
