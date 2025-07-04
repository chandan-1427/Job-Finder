import { FaLaptopCode, FaChartBar, FaBusinessTime, FaUserTie, FaPaintBrush } from "react-icons/fa";
import clsx from "clsx";

const CareerOptionsPage = () => {
  const careerOptions = [
    {
      icon: <FaLaptopCode />,
      title: "Software Development",
      desc: "Software development involves building and maintaining software applications, websites, and mobile apps. There are various roles like Front-End Developer, Back-End Developer, Full-Stack Developer, and DevOps that require expertise in programming, system design, and collaboration.",
      skills: [
        "Programming languages (JavaScript, Python, Java, C++)",
        "Version control (Git)",
        "Agile development",
        "Problem-solving and debugging"
      ],
      industries: ["Technology", "Finance", "Healthcare", "E-commerce"],
      salaryRange: "$60,000 - $150,000 annually",
      color: "indigo",
    },
    {
      icon: <FaChartBar />,
      title: "Data Science & Analytics",
      desc: "Data Science & Analytics involves analyzing large datasets to uncover trends, insights, and help companies make data-driven decisions. Data scientists use statistical methods, machine learning, and visualization tools to interpret complex data.",
      skills: [
        "Data wrangling and cleaning",
        "Statistical analysis",
        "Machine learning algorithms",
        "Data visualization (e.g., Tableau, Power BI)"
      ],
      industries: ["Technology", "Retail", "Healthcare", "Finance"],
      salaryRange: "$70,000 - $180,000 annually",
      color: "blue",
    },
    {
      icon: <FaBusinessTime />,
      title: "Business & Management",
      desc: "Business & Management professionals oversee teams, operations, and projects to drive business success. This includes roles like Project Manager, Business Analyst, and Operations Manager, all focused on improving processes and achieving organizational goals.",
      skills: [
        "Leadership and communication",
        "Project management (e.g., Agile, Scrum)",
        "Business analysis and strategic thinking",
        "Risk management and budgeting"
      ],
      industries: ["Finance", "Consulting", "Technology", "Healthcare"],
      salaryRange: "$50,000 - $120,000 annually",
      color: "green",
    },
    {
      icon: <FaUserTie />,
      title: "Human Resources",
      desc: "Human Resources (HR) professionals manage recruitment, employee relations, and organizational development. Roles include HR Manager, Recruiter, and HR Specialist, all focused on maintaining a healthy work environment and improving employee satisfaction.",
      skills: [
        "Recruitment and talent acquisition",
        "Employee relations and conflict resolution",
        "Performance management",
        "Knowledge of labor laws"
      ],
      industries: ["Corporate", "Non-profits", "Government", "Education"],
      salaryRange: "$45,000 - $100,000 annually",
      color: "purple",
    },
    {
      icon: <FaPaintBrush />,
      title: "Creative & Design",
      desc: "Creative & Design professionals create visual and interactive content to communicate ideas and enhance user experiences. This includes Graphic Designers, UI/UX Designers, Animators, and Art Directors who work on digital and print media.",
      skills: [
        "Graphic design software (Adobe Suite, Figma)",
        "UX/UI principles and wireframing",
        "Creativity and visual storytelling",
        "Animation and motion design"
      ],
      industries: ["Advertising", "Entertainment", "Technology", "E-commerce"],
      salaryRange: "$50,000 - $110,000 annually",
      color: "pink",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">CAREER OPTIONS</h1>
      <p className="text-lg text-gray-600 mb-12 text-center w-4/5 md:w-1/2">
        Discover a range of career paths that match your skills and interests. Explore different industries and roles that suit your goals.
      </p>

      <section className="w-11/12 max-w-screen-xl bg-white py-16 px-6 md:px-12 shadow-2xl rounded-3xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Explore Career Paths</h2>

        {/* Career Options Flexbox */}
        <div className="flex flex-wrap justify-center gap-8">
          {careerOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-start bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full sm:w-64 md:w-72"
            >
              <div className={clsx(`text-${option.color}-600`, "text-6xl mb-5")}>{option.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{option.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{option.desc}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Skills Required</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5 mb-6">
                {option.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Industries</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5 mb-6">
                {option.industries.map((industry, i) => (
                  <li key={i}>{industry}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-gray-900">Salary Range: {option.salaryRange}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerOptionsPage;
