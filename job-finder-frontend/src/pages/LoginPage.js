import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jobFinderLogo from "../assets/jobfinder-logo.gif";

const LoginPage = () => {
  const [login, setLogin] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!login || !password) {
      setError("Username/Email and Password are required!");
      return false;
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
    const user = await loginUser({ login, password }); // returns { id, username, role, ... }

    setLoading(false);
    setSuccess("🎉 Login successful!");

    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }, 1200);
  } catch (err) {
    setLoading(false);
    setError(err.response?.data?.error || "Invalid login credentials. Please try again.");
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-slate-100">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-between w-full p-6 sm:p-10 grow animate-fade-in">
        {/* 🔹 Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
          <img
            src={jobFinderLogo}
            alt="Job Finder Logo"
            className="w-32 md:w-40 h-auto mb-4 drop-shadow-md"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 leading-snug">
            Find Your Dream Job
          </h2>
          <p className="text-gray-600 mt-4 max-w-md leading-relaxed">
            Log in to explore thousands of jobs, build a professional resume,
            and prep for your next big interview — all in one dashboard.
          </p>
        </div>

        {/* 🔹 Right Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 shadow-xl rounded-3xl space-y-5 border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-center text-gray-800">
              Welcome Back 👋
            </h3>

            {/* 🔺 Alert Messages */}
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

            {/* 📝 Login Inputs */}
            <input
              type="text"
              placeholder="Username or Email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* ✅ Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* 🔁 Register Redirect */}
            <p className="text-sm text-gray-600 text-center mt-2">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline font-medium"
              >
                Register now
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
