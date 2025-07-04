import path from "path";
import { fileURLToPath } from "url";
import { generateResumePdf } from "../utils/generatePdf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateResume = async (req, res) => {
  try {
    const userData = req.body;

    const pdfBuffer = await generateResumePdf(userData);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${userData.name.replace(/\s/g, "_")}_Resume.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Resume generation failed:", error);
    res.status(500).json({ message: "Failed to generate resume." });
  }
};

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    console.log("Starting uploadResume function");

    const user = req.user;
    const userId = user._id;
    console.log(`User ID: ${userId}`);

    if (!req.file) {
      console.log("No file uploaded or invalid file type.");
      return res
        .status(400)
        .json({ error: "No file is uploaded or invalid file type." });
    }

    const resumeData = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      uploadedAt: new Date(),
    };

    user.resumes.push(resumeData);
    await user.save();

    const resumeURL = `http://localhost:5000/uploads/resumes/${req.file.filename}`;

    console.log("Resume uploaded successfully:", resumeData);
    res.status(200).json({
      message: "Resume uploaded successfully!",
      resume: resumeData,
      url: resumeURL, // optional to show full path
    });
  } catch (err) {
    console.error("Error in uploadResume:", err.message);
    res.status(500).json({ error: err.message });
  }
};
