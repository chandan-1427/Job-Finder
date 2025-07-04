// src/pages/career/GrowthGraphs.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const growthData = [
  { year: 2020, ai: 15, cybersecurity: 10, healthcare: 8, cloud: 12 },
  { year: 2021, ai: 18, cybersecurity: 12, healthcare: 9, cloud: 15 },
  { year: 2022, ai: 22, cybersecurity: 15, healthcare: 11, cloud: 17 },
  { year: 2023, ai: 28, cybersecurity: 18, healthcare: 14, cloud: 22 },
  { year: 2024, ai: 35, cybersecurity: 22, healthcare: 18, cloud: 26 },
  { year: 2025, ai: 45, cybersecurity: 30, healthcare: 20, cloud: 32 },
];

const GrowthGraphs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Career Growth Projections
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Visualize career growth trends across industries and see where job opportunities are projected to increase in the coming years.
      </p>

      {/* Growth Graph Chart */}
      <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Projected Growth of Top Industries (2020-2025)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ai"
              stroke="#4B6EE6"
              activeDot={{ r: 8 }}
              name="AI & ML"
            />
            <Line
              type="monotone"
              dataKey="cybersecurity"
              stroke="#38A169"
              activeDot={{ r: 8 }}
              name="Cybersecurity"
            />
            <Line
              type="monotone"
              dataKey="healthcare"
              stroke="#ED8936"
              activeDot={{ r: 8 }}
              name="Healthcare IT"
            />
            <Line
              type="monotone"
              dataKey="cloud"
              stroke="#DD6B20"
              activeDot={{ r: 8 }}
              name="Cloud Computing"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Section */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Gain Insights on Career Trends!
        </h2>
        <p className="text-gray-700 mb-6">
          These projections show the high growth sectors over the next few years. Focus your efforts on the fastest-growing industries to maximize opportunities.
        </p>
      </div>
    </div>
  );
};

export default GrowthGraphs;
