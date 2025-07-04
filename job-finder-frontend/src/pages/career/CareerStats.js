// src/pages/career/CareerStats.jsx
import { BarChart, LineChart, XAxis, YAxis, Bar, Line } from "recharts";

const careerData = [
  { industry: "AI & ML", growthRate: 50, avgSalary: 150000 },
  { industry: "Cybersecurity", growthRate: 35, avgSalary: 130000 },
  { industry: "Renewable Energy", growthRate: 40, avgSalary: 110000 },
  { industry: "Healthcare IT", growthRate: 30, avgSalary: 120000 },
  { industry: "Cloud Computing", growthRate: 45, avgSalary: 140000 },
  { industry: "Data Science", growthRate: 38, avgSalary: 125000 },
];

const CareerStats = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center">
        Career Statistics & Insights
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
        Dive into key statistics across industries, such as growth rates, average salaries, and the demand for critical skills in 2025.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bar Chart */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Job Growth Rate by Industry
          </h3>
          <BarChart width={500} height={300} data={careerData}>
            <XAxis dataKey="industry" />
            <YAxis />
            <Bar dataKey="growthRate" fill="#4B6EE6" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Average Salary by Industry
          </h3>
          <LineChart width={500} height={300} data={careerData}>
            <XAxis dataKey="industry" />
            <YAxis />
            <Line type="monotone" dataKey="avgSalary" stroke="#38A169" />
          </LineChart>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Expand Your Knowledge with Market Stats!
        </h2>
        <p className="text-gray-700 mb-6">
          Take advantage of these insights to make better career decisions. Understand the key industries and where to focus your efforts.
        </p>
      </div>
    </div>
  );
};

export default CareerStats;
