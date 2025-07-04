// src/pages/career/HowWeHelp.jsx
import { FaBriefcase, FaTools, FaCheckCircle, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HowWeHelp = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        How We Help You Achieve Career Success
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Our platform offers powerful tools and resources to enhance your career journey. Whether you're job hunting or looking to upskill, we've got you covered.
      </p>

      <div className="flex flex-wrap justify-center gap-12">
        {/* Job Listings Section */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaBriefcase className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Listings</h3>
          <p className="text-gray-600 mb-6 text-center">
            Explore a wide variety of job opportunities across industries. Tailor your job search and apply with confidence.
          </p>
          <Link
            to="/find-jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Explore Job Listings
          </Link>
        </div>

        {/* Resume Builder Section */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaTools className="text-4xl text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resume Builder</h3>
          <p className="text-gray-600 mb-6 text-center">
            Build and customize your resume with ease using our user-friendly resume builder. Stand out to potential employers.
          </p>
          <Link
            to="/resume-builder"
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Start Building Your Resume
          </Link>
        </div>

        {/* Interview Prep Section */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaCheckCircle className="text-4xl text-orange-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interview Prep</h3>
          <p className="text-gray-600 mb-6 text-center">
            Prepare for your interviews with our tips, common questions, and mock interviews to boost your confidence.
          </p>
          <Link
            to="/interview-prep"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Get Interview Ready
          </Link>
        </div>

        {/* Career Counseling Section */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaUserAlt className="text-4xl text-teal-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Career Counseling</h3>
          <p className="text-gray-600 mb-6 text-center">
            Receive personalized career advice and guidance from experienced counselors to help you make informed decisions.
          </p>
          <Link
            to="/services"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Get Career Counseling
          </Link>
        </div>
      </div>

      {/* How We Can Support */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Let Us Help You Build Your Career!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Whether you're starting your career, changing paths, or seeking advancement, we provide you with all the resources you need to succeed.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-800 transition"
        >
          Start Your Journey Now
        </Link>
      </div>
    </div>
  );
};

export default HowWeHelp;
