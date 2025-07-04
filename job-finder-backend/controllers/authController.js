import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

// Regex for Email Format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Regex for Username Format (alphanumeric, 3+ characters)
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
// Regex for Password Strength (at least one lowercase, one uppercase, one number, and one special character, 8+ characters)
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// ✅ GET /me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role = "user", employerDetails } = req.body;

    // Basic Validations
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        error: "Username must be alphanumeric and at least 3 characters"
      });
    }

    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already exists" });
    }

    // Handle employer-specific fields
    let employerData = {};
    if (role === "employer") {
      const { companyName, companyWebsite, companyAddress } = employerDetails || {};

      if (!companyName || !companyWebsite || !companyAddress) {
        return res.status(400).json({
          error: "All employer fields (company name, website, address) are required"
        });
      }

      employerData = {
        employerDetails: {
          companyName,
          companyWebsite,
          companyAddress,
          verified: false // ⛔ Must be approved by admin
        }
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      ...employerData
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Login (Supports Username or Email)
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ $or: [{ email: login }, { username: login }] });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ⛔ Check if employer is verified before login
    if (user.role === "employer" && user.employerDetails?.verified === false) {
      return res.status(403).json({ error: "Your employer account is pending admin approval." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    }).json({
  message: "Login successful!",
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  }
});


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully!" });
};

// Get the user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user without password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Construct full resume URL from latest uploaded resume (if exists)
    let latestResumeURL = null;
    if (user.resumes && user.resumes.length > 0) {
      const latest = user.resumes[user.resumes.length - 1]; // Get most recent
      latestResumeURL = `http://localhost:5000/uploads/resumes/${latest.filename}`;
    }

    // Add resume field (optional, doesn't modify DB)
    const userProfileWithResume = {
      ...user.toObject(),
      resume: latestResumeURL,
    };

    res.status(200).json(userProfileWithResume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
// Update profile
const nameRegex = /^[a-zA-Z\s]{3,100}$/;
const emailRegexStrict = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s\-]{7,20}$/; // allows international + spaces/dashes

// updateProfileController.js
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      fullname,
      highestDegree,
      studiedAt,
      skills,
      completedProjects,
      ongoingProjects,
      experience,
      previousCompanies,
      contactInfo,
    } = req.body;

    // Build update object conditionally to avoid overwriting with undefined/null
    const updateFields = {};

    if (fullname !== undefined) updateFields.fullname = fullname;
    if (highestDegree !== undefined) updateFields.highestDegree = highestDegree;
    if (studiedAt !== undefined) updateFields.studiedAt = studiedAt;
    if (skills !== undefined) updateFields.skills = skills;
    if (completedProjects !== undefined) updateFields.completedProjects = completedProjects;
    if (ongoingProjects !== undefined) updateFields.ongoingProjects = ongoingProjects;
    if (experience !== undefined) updateFields.experience = experience;
    if (previousCompanies !== undefined) updateFields.previousCompanies = previousCompanies;
    if (contactInfo !== undefined) updateFields.contactInfo = contactInfo;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// Upload profile picture controller
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // If user already has a profile image, delete the old file
    if (user.profileImage) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        "profile-pictures",
        user.profileImage
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    user.profileImage = req.file.filename;
    await user.save();

    res.status(200).json({ message: "Profile picture uploaded", imageUrl: user.profileImage });
  } catch (error) {
    console.error("uploadProfilePicture error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete profile picture controller
export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.profileImage) {
      return res.status(400).json({ error: "No profile picture to delete" });
    }

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      "profile-pictures",
      user.profileImage
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    user.profileImage = null;
    await user.save();

    res.status(200).json({ message: "Profile picture deleted" });
  } catch (error) {
    console.error("deleteProfilePicture error:", error);
    res.status(500).json({ error: "Server error" });
  }
};