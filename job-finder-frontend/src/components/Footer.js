import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <footer className="bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900 text-white py-10 w-full mt-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12">

        {/* About & Contact */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-yellow-400 tracking-wide">About & Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            JobFinder helps you find your dream job with ease. Explore thousands of job listings and apply instantly.
          </p>

          <p className="text-gray-300 flex items-center space-x-2">
            <span role="img" aria-label="location">📍</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Remote"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Remote & Worldwide
            </a>
          </p>

          <p className="text-gray-300 flex items-center space-x-2">
            <span role="img" aria-label="email">✉️</span>
            <a
              href="mailto:support@jobfinder.com"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              support@jobfinder.com
            </a>
          </p>

          <p className="text-gray-300 flex items-center space-x-2">
            <span role="img" aria-label="phone">📞</span>
            <a
              href="tel:+1234567890"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              +91 987654321
            </a>
          </p>
        </div>

        {/* Our Services (Only if authenticated) */}
        {isAuthenticated && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-400 tracking-wide">Our Services</h2>
            <ul className="text-gray-300 space-y-3">
              {[
                { label: "Find Jobs", path: "/find-jobs" },
                { label: "Resume Builder", path: "/resume-builder" },
                { label: "Interview Preparation", path: "/interview-prep" },
              ].map(({ label, path }) => (
                <li
                  key={path}
                  onClick={() => navigate(path)}
                  className="cursor-pointer hover:text-yellow-400 transition-colors duration-300"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === 'Enter') navigate(path); }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Follow Us */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-yellow-400 tracking-wide">Follow Us</h2>
          <div className="flex space-x-6 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-3xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-3xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-3xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-3xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-sm text-gray-400 border-t border-gray-700 pt-6 select-none">
        © {new Date().getFullYear()} JobFinder. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
