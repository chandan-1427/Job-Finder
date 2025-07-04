// src/pages/career/JobSearchStrategies.jsx
import { Search, Users, Briefcase, Link, Smartphone } from "lucide-react";

const strategies = [
  {
    icon: <Search className="w-8 h-8 text-green-600" />,
    title: "Master the Art of Networking",
    description: "Leverage your network on LinkedIn and other platforms. Make connections, attend virtual events, and request informational interviews to expand your professional circle.",
  },
  {
    icon: <Users className="w-8 h-8 text-teal-600" />,
    title: "Use Job Boards Wisely",
    description: "Optimize job board searches by tailoring them to your specific skillset. Keep your resume updated and apply to a range of positions to increase your chances.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    title: "Tailor Your Resume & Cover Letter",
    description: "Personalize your resume and cover letter to each job you apply for. Highlight the skills and experiences most relevant to the role, ensuring your application stands out.",
  },
  {
    icon: <Link className="w-8 h-8 text-indigo-600" />,
    title: "Personal Branding on LinkedIn",
    description: "Make your LinkedIn profile shine. Regularly post, engage in industry discussions, and request recommendations from colleagues to build your online presence.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-orange-600" />,
    title: "Optimize Mobile Job Search",
    description: "Many employers are using mobile-optimized platforms. Set up job alerts on your phone, making it easy to apply on-the-go.",
  },
];

const JobSearchStrategies = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Effective Job Search Strategies
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Finding your ideal job takes strategy. Discover key methods to maximize your job search and land opportunities quicker.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 bg-gray-50 rounded-xl shadow-sm p-6 hover:shadow-lg transition"
          >
            <div className="flex-shrink-0">
              {strategy.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {strategy.title}
              </h3>
              <p className="text-gray-600">{strategy.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Ready to implement these strategies?
        </h2>
        <p className="text-gray-700 mb-6">
          Use these strategies, stay persistent, and watch your job prospects improve. Need help? We’ve got the tools for your success!
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-800 transition"
        >
          Find Jobs Now By Joining Us
        </a>
      </div>
    </div>
  );
};

export default JobSearchStrategies;
