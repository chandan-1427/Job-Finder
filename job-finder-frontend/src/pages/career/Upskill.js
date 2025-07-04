// src/pages/career/Upskill.jsx
import { FaGraduationCap, FaLaptopCode, FaMedal, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Upskill = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Upskill & Reskill: Boost Your Career
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Stay ahead in the ever-changing job market by learning new skills and gaining certifications that can advance your career. Explore top online courses, training, and certifications to enhance your knowledge and expertise.
      </p>

      <div className="flex flex-wrap justify-center gap-12">
        {/* Programming and Tech Skills */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaLaptopCode className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Programming & Tech Skills</h3>
          <p className="text-gray-600 mb-6 text-center">
            Learn the latest programming languages and tech skills in demand like Python, JavaScript, AI, and more.
          </p>
          <Link
            to="/services"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Explore Tech Courses
          </Link>
        </div>

        {/* Business & Leadership */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaGraduationCap className="text-4xl text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Business & Leadership</h3>
          <p className="text-gray-600 mb-6 text-center">
            Master business skills, leadership strategies, and project management techniques to lead teams and drive growth.
          </p>
          <Link
            to="/services"
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Explore Business Courses
          </Link>
        </div>

        {/* Certifications & Professional Development */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaMedal className="text-4xl text-yellow-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Certifications & Development</h3>
          <p className="text-gray-600 mb-6 text-center">
            Enhance your career prospects by earning certifications in fields like data science, cloud computing, and digital marketing.
          </p>
          <Link
            to="/services"
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Explore Certification Courses
          </Link>
        </div>

        {/* Books & Learning Resources */}
        <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg w-full sm:w-72 lg:w-80">
          <FaBook className="text-4xl text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Books & Learning Resources</h3>
          <p className="text-gray-600 mb-6 text-center">
            Dive into the best books and learning resources to build a solid foundation in your field or explore new industries.
          </p>
          <Link
            to="/services"
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Explore Learning Resources
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Equip Yourself for the Future
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          The right skills will take you to new career heights. Find the tools, knowledge, and certifications to expand your career opportunities.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-800 transition"
        >
          Start Upskilling Today
        </Link>
      </div>
    </div>
  );
};

export default Upskill;
