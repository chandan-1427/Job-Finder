import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaFileAlt,
  FaComments,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const features = [
    {
      icon: (
        <FaCheckCircle className="text-blue-600 text-4xl mb-3" aria-hidden="true" />
      ),
      title: "Personalized Job Matches",
      desc: "Get recommendations tailored to your skills and goals with our intelligent matching system.",
    },
    {
      icon: (
        <FaCheckCircle className="text-blue-600 text-4xl mb-3" aria-hidden="true" />
      ),
      title: "AI-Powered Resume Builder",
      desc: "Craft professional resumes effortlessly using AI-driven templates and guidance.",
    },
    {
      icon: (
        <FaCheckCircle className="text-blue-600 text-4xl mb-3" aria-hidden="true" />
      ),
      title: "Expert Interview Prep",
      desc: "Practice realistic interviews and receive actionable feedback to build confidence.",
    },
  ];

  const insights = [
    {
      title: "Top Hiring Industries",
      desc: "Technology, healthcare, and finance are leading the job market. Position yourself to excel.",
    },
    {
      title: "Average Salaries 2025",
      desc: "Stay informed on salary benchmarks across roles and industries for smart career moves.",
    },
    {
      title: "Remote Work Trends",
      desc: "Remote work is here to stay. Learn how to find and succeed in remote opportunities.",
    },
  ];

  const services = [
    {
      icon: <FaBriefcase />,
      title: "Find Jobs",
      desc: "Explore thousands of curated job listings with smart filters and alerts.",
      route: "/find-jobs",
    },
    {
      icon: <FaFileAlt />,
      title: "Resume Builder",
      desc: "Build a standout resume with AI templates tailored to your industry.",
      route: "/resume-builder",
    },
    {
      icon: <FaComments />,
      title: "Interview Prep",
      desc: "Access mock interviews and expert tips to nail your next opportunity.",
      route: "/interview-prep",
    },
    {
      icon: <FiBookmark />,
      title: "Post Job",
      desc: "Employers can post vacancies and find qualified candidates efficiently.",
      route: "/post-job",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 pt-16 px-4 flex flex-col items-center font-opensans">
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center py-24 bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-xl shadow-lg animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          Find Your Dream Job Today
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto">
          Explore thousands of jobs, get career advice, and land your ideal role effortlessly.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white py-4 px-10 rounded-lg font-semibold shadow-md transition"
          >
            Start Your Journey 🚀
          </Link>
        )}
      </section>

      {/* Features */}
      {!isAuthenticated && (
        <section
          className="w-full max-w-6xl bg-white mt-16 rounded-2xl shadow-xl p-12 text-center"
          aria-labelledby="features-heading"
        >
          <h2 id="features-heading" className="text-3xl font-semibold text-blue-800 mb-8">
            Why Choose Job Finder?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
            Job Finder is your ultimate career companion — powerful job search, AI resume builder, and expert interview prep all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {features.map(({ icon, title, desc }, idx) => (
              <article
                key={idx}
                className="flex flex-col items-center bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 w-full sm:w-80"
                tabIndex={0}
              >
                {icon}
                <h3 className="font-bold text-xl mb-3 mt-2 text-blue-900">{title}</h3>
                <p className="text-blue-800 text-sm leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>

          <Link
            to="/register"
            className="mt-12 inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition"
          >
            Register Now & Start Your Career 🚀
          </Link>
        </section>
      )}

      {/* Career Insights */}
      <section
        className="w-full max-w-6xl bg-white mt-16 rounded-2xl shadow-xl p-12 text-center"
        aria-labelledby="insights-heading"
      >
        <header className="flex items-center justify-center gap-3 text-blue-800 text-3xl font-semibold mb-6">
          <FaChartLine className="text-blue-700 text-5xl" aria-hidden="true" />
          <h2 id="insights-heading">Career Insights & Job Trends</h2>
        </header>

        <p className="text-gray-700 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
          Stay updated with the latest job trends, salary insights, and career growth strategies to position yourself for success.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {insights.map(({ title, desc }, idx) => (
            <article
              key={idx}
              className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 w-full sm:w-80 flex flex-col items-center"
              tabIndex={0}
            >
              <h3 className="font-semibold text-blue-900 text-lg mb-3">{title}</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>

        <Link
          to="/career-insights"
          className="mt-12 inline-block bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white py-3 px-10 rounded-lg font-semibold shadow-md transition"
        >
          Explore Career Insights
        </Link>
      </section>

      {/* Services for Logged-In Users */}
      {isAuthenticated && (
        <section
          className="w-full max-w-6xl bg-white mt-16 rounded-2xl shadow-xl p-12 text-center"
          aria-labelledby="services-heading"
        >
          <h2 id="services-heading" className="text-3xl font-bold text-gray-800 mb-10">
            Our Services
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            {services.map(({ icon, title, desc, route }, idx) => (
              <article
                key={idx}
                tabIndex={0}
                role="button"
                onClick={() => navigate(route)}
                onKeyDown={(e) => e.key === "Enter" && navigate(route)}
                className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 w-full sm:w-80 flex flex-col items-center cursor-pointer"
              >
                <div className="text-blue-600 text-6xl mb-5" aria-hidden="true">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
                <p className="text-blue-800 text-sm text-center leading-relaxed">{desc}</p>
                <button
                  onClick={() => navigate(route)}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white px-6 py-3 rounded-full font-semibold transition"
                  aria-label={`Go to ${title}`}
                >
                  {title}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Employer CTA */}
      {!isAuthenticated && (
        <section className="w-full max-w-6xl bg-white mt-20 rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Are You Hiring?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-lg">
            Join as an employer to post jobs, manage applications, and discover top talent.
          </p>
          <Link
            to="/register?role=employer"
            className="inline-block bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white py-4 px-10 rounded-lg font-semibold shadow-md transition"
          >
            Sign Up as Employer
          </Link>
        </section>
      )}
    </main>
  );
}

export default Home;
