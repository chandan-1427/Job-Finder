import { useState } from "react";
import axios from "axios";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [viewAllJobs, setViewAllJobs] = useState(false);

  const fetchAllJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/job/all-jobs`);
      if (response.data && Array.isArray(response.data)) {
        setJobs(response.data.slice(0, 10));
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let criteria = "by job name or company";
    if (!isNaN(query) && query.trim() !== "") {
      criteria = "by salary";
    } else if (query.toLowerCase().includes("work")) {
      criteria = "by work type";
    } else if (query.toLowerCase().includes("requirement")) {
      criteria = "by requirements";
    }

    setSearchCriteria(criteria);

    try {
      const response = await axios.get(`http://localhost:5000/api/job/search?query=${query}`);
      if (response.data && Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6 md:px-12">
      <h1 className="text-5xl font-extrabold text-blue-800 text-center mb-3 drop-shadow-md">
        Find Your Dream Job
      </h1>
      <p className="text-center text-blue-600 text-lg max-w-xl mx-auto mb-8">
        Explore thousands of job opportunities across industries and locations.
      </p>

      {/* Buttons */}
      <div className="flex justify-center space-x-6 mb-10">
        <button
          onClick={() => {
            setViewAllJobs(true);
            fetchAllJobs();
          }}
          className="px-8 py-3 bg-blue-700 text-white rounded-xl shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        >
          View All Jobs
        </button>
        <button
          onClick={() => {
            setViewAllJobs(false);
            setQuery("");
            setJobs([]);
            setError(null);
            setSearchCriteria("");
          }}
          className="px-8 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
        >
          Search Specific Jobs
        </button>
      </div>

      {/* Search Form */}
      {!viewAllJobs && (
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 border-b-4 border-blue-300 pb-6 mb-6"
        >
          <input
            type="text"
            placeholder="Enter job title, company, salary, or requirements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition shadow-sm text-lg"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || query.trim() === ""}
            className={`px-8 py-3 rounded-lg text-white font-semibold transition
              ${
                loading || query.trim() === ""
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400"
              }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      )}

      {/* Status Messages */}
      {!viewAllJobs && searchCriteria && (
        <p className="text-center text-blue-500 italic mb-4">
          Searching {searchCriteria}...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold mb-6">{error}</p>
      )}

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer"
              tabIndex={0}
              role="article"
              aria-label={`${job.jobName} at ${job.companyName}`}
            >
              <div>
                <h3 className="text-2xl font-bold text-blue-700 mb-3 truncate">
                  {job.jobName}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Company:</span> {job.companyName}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Salary:</span> ₹{job.minSalary.toLocaleString()} - ₹{job.maxSalary.toLocaleString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Work Type:</span> {job.workType}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Study Requirement:</span> {job.studyRequirement}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Expected Requirements:</span> {job.expectedRequirements}
                </p>
              </div>
              <button
                className="mt-5 bg-blue-600 text-white rounded-lg py-2 text-center hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
                onClick={() => alert(`You clicked on ${job.jobName}`)}
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg italic">
            No jobs found. Please try a different search.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
