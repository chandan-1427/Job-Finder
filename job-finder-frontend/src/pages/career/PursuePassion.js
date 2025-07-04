// src/pages/career/PursuePassion.jsx
import { Lightbulb, Heart, TrendingUp, Target } from "lucide-react";

const benefits = [
  {
    icon: <Heart className="w-8 h-8 text-pink-600" />,
    title: "Fulfillment & Joy",
    description: "Working in a field you're passionate about brings daily satisfaction and intrinsic motivation.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
    title: "Sustainable Growth",
    description: "You’re more likely to persist, upskill, and innovate when your work aligns with your passion.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Creativity Boost",
    description: "Passion fuels creativity, helping you approach problems with fresh perspectives.",
  },
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Clearer Goals",
    description: "A strong interest gives direction and focus to your career planning and long-term goals.",
  },
];

const PursuePassion = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Pursue Your Passion
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Choosing a career aligned with your passion not only enhances job satisfaction but also drives long-term success and personal growth. Discover why following your interests can shape a fulfilling career journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 bg-gray-50 rounded-xl shadow-sm p-6 hover:shadow-lg transition"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Ready to turn your passion into a profession?
        </h2>
        <p className="text-gray-700 mb-6">
          Explore career options, gain new skills, and make your dream job a reality with our expert resources.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-800 transition"
        >
          Join Us
        </a>
      </div>
    </div>
  );
};

export default PursuePassion;
