import { useNavigate } from "react-router-dom";
import { FaLightbulb, FaChartLine, FaCompass, FaLaptopCode, FaSearch, FaHandshake } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { FiBarChart2 } from "react-icons/fi";
import clsx from "clsx";

const CareerInsightsPage = () => {
  const navigate = useNavigate();

  const insights = [
    {
      icon: <FaCompass />,
      title: "Explore Career Options",
      desc: "Discover diverse career paths—from traditional roles to emerging fields—tailored to your skills and interests.",
      route: "/career-options",
      color: "purple",
    },
    {
      icon: <FaLightbulb />,
      title: "Pursue Your Passion",
      desc: "Learn strategies to align your passion with viable career opportunities and long-term success.",
      route: "/pursue-passion",
      color: "yellow",
    },
    {
      icon: <FaSearch />,
      title: "Effective Job Search",
      desc: "Master techniques for finding jobs quickly, including networking, job boards, and personal branding tips.",
      route: "/job-search-strategies",
      color: "blue",
    },
    {
      icon: <MdTrendingUp />,
      title: "Trending Careers 2025",
      desc: "Stay ahead with insights into in-demand industries like AI, cybersecurity, cloud computing, and green energy.",
      route: "/trending-careers",
      color: "pink",
    },
    {
      icon: <FiBarChart2 />,
      title: "Career Statistics & Salaries",
      desc: "Access data on job growth, average salaries, and required skills across multiple industries.",
      route: "/career-stats",
      color: "green",
    },
    {
      icon: <FaChartLine />,
      title: "Growth Projections",
      desc: "Visualize career growth trends with graphs showing emerging fields and future job opportunities.",
      route: "/growth-graphs",
      color: "indigo",
    },
    {
      icon: <FaHandshake />,
      title: "How We Help You",
      desc: "Leverage JobFinder's tools—job listings, resume builder, interview prep, and career counseling.",
      route: "/how-we-help",
      color: "teal",
    },
    {
      icon: <FaLaptopCode />,
      title: "Upskill & Reskill",
      desc: "Find top online courses and certifications to boost your career prospects in today’s digital economy.",
      route: "/upskill",
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">CAREER INSIGHTS</h1>
      <p className="text-lg text-gray-600 mb-12 text-center w-4/5 md:w-1/2">
        Get deep insights about careers, trending jobs, how to align passion with work, market stats, and tools to build your dream future.
      </p>

      <section className="w-11/12 max-w-screen-xl bg-white py-16 px-6 md:px-12 shadow-2xl rounded-3xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">What You’ll Learn</h2>

        {/* Insights Flexbox */}
        <div className="flex flex-wrap justify-center gap-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full sm:w-64 md:w-72"
            >
              <div className={clsx(`text-${insight.color}-600`, "text-6xl mb-5")}>{insight.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">{insight.title}</h3>
              <p className="text-gray-600 text-center mb-6 text-sm">{insight.desc}</p>
              <button
                className={clsx(
                  `bg-${insight.color}-600 hover:bg-${insight.color}-700`,
                  "text-white text-sm px-5 py-2 rounded-full transition-all duration-300"
                )}
                onClick={() => navigate(insight.route)}
              >
                Explore {insight.title.split(" ")[0]}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerInsightsPage;
