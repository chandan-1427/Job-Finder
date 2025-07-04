import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication properly via API
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Auth check failed", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      alert("Logged out successfully!");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <style>{`
        @keyframes dropdownFadeSlide {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-5 fixed top-0 w-full z-20 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Name only, no logo */}
          <div 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 font-extrabold text-yellow-400 text-3xl"
            onClick={() => navigate("/")}
          >
            JobFinder
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
            >
              Home
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/services")}
                  className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
                >
                  Services
                </button>

                {/* Profile Dropdown Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="px-4 py-2 flex items-center gap-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
                  >
                    <span>Profile</span>
                    <span className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`}>
                      ▼
                    </span>
                  </button>

                  {showDropdown && (
                    <div
                      style={{ animation: "dropdownFadeSlide 250ms ease forwards" }}
                      className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/profile");
                        }}
                        className="block px-4 py-3 hover:bg-gray-100 w-full text-left"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-3 hover:bg-gray-100 w-full text-left border-t"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-300"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
