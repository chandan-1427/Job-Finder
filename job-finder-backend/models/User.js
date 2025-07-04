import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String }, // Optional if using OAuth
    oauthProvider: { type: String, enum: ["google", "github", null], default: null },
    oauthId: { type: String, default: null },

    fullname: { type: String, trim: true },
    highestDegree: { type: String },
    studiedAt: { type: String },
    skills: { type: [String], default: [] },
    completedProjects: { type: [String], default: [] },
    ongoingProjects: { type: [String], default: [] },
    experience: { type: String },
    previousCompanies: { type: [String], default: [] },
    contactInfo: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
    },
    profileImage: { type: String },
    resumes: [resumeSchema],

    // Role field to distinguish user types
    role: {
      type: String,
      enum: ["user", "employer", "admin"],
      default: "user",
    },

    // Optional employer-specific details
    employerDetails: {
      companyName: { type: String, trim: true },
      companyWebsite: { type: String, trim: true },
      companyAddress: { type: String, trim: true },
      verified: { type: Boolean, default: false }, // For verification status
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
