import { Cpu, Shield, Sun, Cloud, BarChart, Heart } from "lucide-react";

const trendingCareers = [
  {
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    title: "AI & Machine Learning Engineer",
    description: "Design and implement artificial intelligence systems. This role is in high demand due to the rise of automation and machine learning.",
    salary: "$120,000 - $200,000/year",
    skills: ["Python", "TensorFlow", "Data Science", "Algorithms"],
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Cybersecurity Specialist",
    description: "Protect organizations from cyber threats by implementing security measures and responding to breaches.",
    salary: "$90,000 - $160,000/year",
    skills: ["Network Security", "Ethical Hacking", "Risk Management"],
  },
  {
    icon: <Sun className="w-8 h-8 text-yellow-600" />,
    title: "Renewable Energy Engineer",
    description: "Design and improve renewable energy systems like solar and wind power to reduce reliance on fossil fuels.",
    salary: "$80,000 - $150,000/year",
    skills: ["Solar Energy", "Electrical Engineering", "Sustainability"],
  },
  {
    icon: <Cloud className="w-8 h-8 text-indigo-600" />,
    title: "Cloud Solutions Architect",
    description: "Design cloud-based infrastructure and services for businesses looking to move operations to the cloud.",
    salary: "$110,000 - $180,000/year",
    skills: ["AWS", "Azure", "Cloud Computing", "DevOps"],
  },
  {
    icon: <BarChart className="w-8 h-8 text-purple-600" />,
    title: "Data Scientist",
    description: "Analyze and interpret complex data to help organizations make data-driven decisions.",
    salary: "$95,000 - $170,000/year",
    skills: ["Data Analysis", "Python", "SQL", "Machine Learning"],
  },
  {
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Healthcare Data Analyst",
    description: "Analyze healthcare data to improve patient outcomes, optimize hospital processes, and support public health initiatives.",
    salary: "$70,000 - $120,000/year",
    skills: ["Healthcare IT", "Data Analytics", "EHR Systems"],
  },
];

const TrendingCareers = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Trending Careers of 2025
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Explore the career fields that are expected to see significant growth in the coming years. These jobs are high-demand and highly rewarding.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingCareers.map((career, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center mb-6">
              <div className="mr-4">{career.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">{career.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{career.description}</p>
            <p className="text-gray-700 font-semibold">Salary Range: <span className="text-blue-600">{career.salary}</span></p>
            <p className="text-gray-700 mt-2">Key Skills: {career.skills.join(", ")}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Get Started on Your Career Path Today!
        </h2>
        <p className="text-gray-700 mb-6">
          Ready to jump into one of these booming careers? Start your job search, acquire new skills, and set yourself up for success.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-800 transition"
        >
          Bact to Home
        </a>
      </div>
    </div>
  );
};

export default TrendingCareers;
