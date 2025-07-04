import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobName: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  workType: { type: String, required: true }, // e.g., Remote, On-site, Hybrid
  studyRequirement: { type: String, required: true },
  expectedRequirements: { type: String, required: true },
  location: { type: String, required: true }, // City, Region, or Remote
  jobType: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  applicationDeadline: { type: Date }, // Optional but useful
  description: { type: String }, // Longer job description
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "active" } // active, closed, etc.
}, { timestamps: true });

const JobPost = mongoose.model("JobPost", jobPostSchema);
export default JobPost;
