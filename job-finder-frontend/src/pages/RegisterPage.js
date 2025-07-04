import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../services/api";
import Navbar from "../components/Navbar";
import jobFinderLogo from "../assets/jobfinder-logo.gif";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") === "employer" ? "employer" : "user";

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role,
    employerDetails: {
      companyName: "",
      companyWebsite: "",
      companyAddress: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser((prev) => ({ ...prev, role }));
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (role === "employer" && name.startsWith("company")) {
      setUser((prev) => ({
        ...prev,
        employerDetails: {
          ...prev.employerDetails,
          [name]: value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!user.username || !user.email || !user.password) {
      setError("All fields are required!");
      return false;
    }

    if (role === "employer") {
      const { companyName, companyWebsite, companyAddress } = user.employerDetails;
      if (!companyName || !companyWebsite || !companyAddress) {
        setError("All employer fields are required!");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(user);
      setSuccess("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setError(err.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isEmployer = role === "employer";
  const heading = isEmployer ? "Create Employer Account" : "Create Your Account";
  const subHeading = isEmployer
    ? "Post jobs, manage applicants, and find great talent."
    : "Unlock thousands of jobs, build resumes, and prepare for interviews.";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-slate-100">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-between w-full p-6 sm:p-10 grow animate-fade-in">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
          <img
            src={jobFinderLogo}
            alt="Job Finder Logo"
            className="w-32 md:w-40 h-auto mb-4 drop-shadow-md"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 leading-snug">
            {isEmployer ? "Hire Smarter with JobFinder" : "Join JobFinder Today!"}
          </h2>
          <p className="text-gray-600 mt-4 max-w-md leading-relaxed">{subHeading}</p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 shadow-xl rounded-3xl space-y-5 border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-center text-gray-800">
              {heading}
            </h3>

            {error && (
              <div className="bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded-lg text-sm animate-fade-in">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-600 border border-green-300 px-4 py-2 rounded-lg text-sm animate-fade-in">
                {success}
              </div>
            )}

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-sm text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {isEmployer && (
              <>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={user.employerDetails.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />

                <input
                  type="text"
                  name="companyWebsite"
                  placeholder="Company Website"
                  value={user.employerDetails.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />

                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address"
                  value={user.employerDetails.companyAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
