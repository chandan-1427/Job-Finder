import JobPost from "../models/jobPost.js";

export const postJob = async (req, res) => {
  try {
    const {
      companyName,
      jobName,
      minSalary,
      maxSalary,
      workType,
      studyRequirement,
      expectedRequirements,
      location,
      jobType,
      applicationDeadline,
      description
    } = req.body;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate required fields
    if (
      !companyName || !jobName || minSalary == null || maxSalary == null ||
      !workType || !studyRequirement || !expectedRequirements || !location || !jobType
    ) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Validate salary range
    if (isNaN(minSalary) || isNaN(maxSalary) || minSalary < 0 || maxSalary < 0 || minSalary > maxSalary) {
      return res.status(400).json({ error: "Invalid salary range." });
    }

    // Create new job post
    const newJob = new JobPost({
      companyName,
      jobName,
      minSalary,
      maxSalary,
      workType,
      studyRequirement,
      expectedRequirements,
      location,
      jobType,
      applicationDeadline,
      description,
      postedBy: req.user._id
    });

    await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      job: {
        id: newJob._id,
        jobName: newJob.jobName,
        companyName: newJob.companyName,
        location: newJob.location,
        postedAt: newJob.createdAt
      }
    });

  } catch (error) {
    console.error("Error in posting job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to search jobs
export const searchJobs = async (req, res) => {
  try {
    const query = req.query.query || '';  // Retrieve the query parameter
    
    // Check if the query is a number to handle numeric fields differently
    const isNumber = !isNaN(query) && query.trim() !== '';
    const searchQuery = isNumber ? parseFloat(query) : query;

    const jobs = await JobPost.find({
      $or: [
        { jobName: { $regex: searchQuery, $options: 'i' } },
        { companyName: { $regex: searchQuery, $options: 'i' } },
        { workType: { $regex: searchQuery, $options: 'i' } },
        { studyRequirement: { $regex: searchQuery, $options: 'i' } },
        { expectedRequirements: { $regex: searchQuery, $options: 'i' } },
        // Only apply numeric search for minSalary and maxSalary
        { minSalary: isNumber ? searchQuery : { $exists: true } },
        { maxSalary: isNumber ? searchQuery : { $exists: true } }
      ]
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error searching jobs:", error.message);
    res.status(500).json({ message: "Error searching jobs", error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate("postedBy", "name email").limit(5);
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: error.message });
  }
};
