import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaFileAlt, FaComments } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaBriefcase />,
      title: "Find Jobs",
      desc: "Explore thousands of job opportunities across multiple industries.",
      route: "/find-jobs",
      color: "blue-600",
    },
    {
      icon: <FaFileAlt />,
      title: "Resume Builder",
      desc: "Create a professional resume to stand out in the competitive job market.",
      route: "/resume-builder",
      color: "blue-600",
    },
    {
      icon: <FaComments />,
      title: "Interview Prep",
      desc: "Practice with mock interviews and expert tips to boost your confidence.",
      route: "/interview-prep",
      color: "blue-600",
    },
    {
      icon: <FiBookmark />,
      title: "Post Job",
      desc: "Post job openings easily and find the right candidates quickly.",
      route: "/post-job",
      color: "blue-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4 font-opensans">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight mb-4 drop-shadow-md">
          OUR SERVICES
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Helping you find jobs, build impactful resumes, prepare for interviews, and post vacancies effortlessly.
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="max-w-7xl mx-auto px-4">
        <h2
          id="services-heading"
          className="text-4xl font-bold text-blue-800 text-center mb-12"
        >
          What We Offer
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {services.map(({ icon, title, desc, route, color }, index) => (
            <article
              key={index}
              tabIndex={0}
              role="button"
              onClick={() => navigate(route)}
              onKeyDown={(e) => (e.key === "Enter" ? navigate(route) : null)}
              className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-10 cursor-pointer max-w-xs w-full
                         hover:scale-[1.05] transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s`, animationName: 'fadeInUp', animationFillMode: 'forwards', opacity: 0 }}
            >
              <div
                className={`mb-6 p-5 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 text-white text-7xl drop-shadow-lg`}
                aria-hidden="true"
              >
                {icon}
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                {title}
              </h3>
              <p className="text-gray-700 text-center text-sm mb-8 leading-relaxed">
                {desc}
              </p>

              <button
                className={`bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white px-6 py-3 rounded-full font-medium text-sm transition`}
                aria-label={`Go to ${title}`}
              >
                {title}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Add subtle fadeInUp animation styles inline or in your global CSS */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
};

export default ServicesPage;
