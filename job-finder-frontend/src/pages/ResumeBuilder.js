import { useState } from "react";
// You might need to install react-icons if you want to use them for add/remove buttons, etc.
// npm install react-icons

const sampleData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  portfolio: "johndoe.com",
  summary:
    "Experienced software developer with a passion for building scalable web applications, proficient in modern web technologies and agile methodologies. Always eager to learn new skills and tackle challenging problems.",
  categories: [
    { title: "Technical Skills", skills: "JavaScript, React, Node.js, HTML, CSS, Tailwind CSS, Git, MongoDB, Express.js" },
    { title: "Soft Skills", skills: "Problem-solving, Teamwork, Communication, Adaptability, Time Management" },
  ],
  experience: [
    {
      title: "Frontend Developer",
      company: "Tech Corp",
      years: "2022 - Present",
      description: "Developed and maintained highly responsive web applications using React and Redux, improving user engagement by 20%. Collaborated with UX/UI designers to implement intuitive interfaces.",
    },
    {
      title: "Junior Web Developer",
      company: "Innovate Solutions",
      years: "2019 - 2022",
      description: "Assisted in the development of client-side logic and features for e-commerce platforms. Gained experience with various front-end frameworks and version control systems.",
    },
  ],
  education: [
    {
      degree: "BSc Computer Science",
      institution: "State University",
      year: "2018",
    },
  ],
  certifications: [
    {
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2023",
    },
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      year: "2021",
    },
  ],
  projects: [
    {
      name: "Personal Portfolio Website",
      summary: "A personal portfolio website showcasing projects and skills, built with React and TailwindCSS, demonstrating responsive design principles.",
      link: "https://johndoe.com",
    },
    {
      name: "E-commerce Platform Redesign",
      summary: "Led the front-end redesign for a medium-sized e-commerce site, resulting in a 15% increase in conversion rates. Implemented features like product filtering and shopping cart management.",
      link: "https://ecommerce-project.com",
    },
  ],
  links: [{ label: "Blog", url: "https://blog.johndoe.com" }, { label: "GitHub Profile", url: "https://github.com/johndoe" }],
  languages: ["English (Native)", "Spanish (Conversational)"],
  interests: ["Hiking", "Photography", "Reading Sci-Fi", "Volunteering"],
};

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    categories: [{ title: "", skills: "" }], // Adjusted for comma-separated skills
    experience: [{ title: "", company: "", years: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    projects: [{ name: "", summary: "", link: "" }],
    links: [{ label: "", url: "" }],
    languages: [""],
    interests: [""],
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const handleArrayStringChange = (section, index, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index] = value;
    setFormData((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const handleAddEntry = (section, emptyEntry) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyEntry],
    }));
  };

  const handleRemoveEntry = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      // Ensure there's always at least one empty entry for the section if it becomes empty
      [section]: updatedSection.length ? updatedSection : [emptyEntry(section)],
    }));
  };

  const emptyEntry = (section) => {
    switch (section) {
      case "experience":
        return { title: "", company: "", years: "", description: "" };
      case "education":
        return { degree: "", institution: "", year: "" };
      case "certifications":
        return { title: "", issuer: "", year: "" };
      case "projects":
        return { name: "", summary: "", link: "" };
      case "links":
        return { label: "", url: "" };
      case "languages":
      case "interests":
        return "";
      case "categories": // Added for categories
        return { title: "", skills: "" };
      default:
        return {};
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    // Validate Experience
    const experienceErrors = formData.experience.map((exp) => {
      const itemErrors = {};
      if (!exp.title.trim()) itemErrors.title = "Job Title is required";
      if (!exp.company.trim()) itemErrors.company = "Company is required";
      return Object.keys(itemErrors).length > 0 ? itemErrors : null;
    });
    if (experienceErrors.some(err => err !== null)) {
      newErrors.experience = experienceErrors;
    } else if (!formData.experience.length || formData.experience.every(exp => !exp.title.trim() && !exp.company.trim())) {
      newErrors.experience = "At least one experience entry with title and company is required.";
    }

    // Validate Education
    const educationErrors = formData.education.map((edu) => {
      const itemErrors = {};
      if (!edu.degree.trim()) itemErrors.degree = "Degree is required";
      if (!edu.institution.trim()) itemErrors.institution = "Institution is required";
      return Object.keys(itemErrors).length > 0 ? itemErrors : null;
    });
    if (educationErrors.some(err => err !== null)) {
      newErrors.education = educationErrors;
    }

    // Validate Certifications (optional, depending on strictness)
    const certificationErrors = formData.certifications.map((cert) => {
      const itemErrors = {};
      if (!cert.title.trim()) itemErrors.title = "Certification title is required";
      return Object.keys(itemErrors).length > 0 ? itemErrors : null;
    });
    if (certificationErrors.some(err => err !== null)) {
      newErrors.certifications = certificationErrors;
    }

    // Validate Projects
    const projectErrors = formData.projects.map((proj) => {
      const itemErrors = {};
      if (!proj.name.trim()) itemErrors.name = "Project Name is required";
      return Object.keys(itemErrors).length > 0 ? itemErrors : null;
    });
    if (projectErrors.some(err => err !== null)) {
      newErrors.projects = projectErrors;
    } else if (!formData.projects.length || formData.projects.every(proj => !proj.name.trim())) {
      newErrors.projects = "At least one project with a name is required.";
    }

    // Validate Categories (title)
    const categoryErrors = formData.categories.map((cat) => {
        const itemErrors = {};
        if (!cat.title.trim()) itemErrors.title = "Category title is required";
        return Object.keys(itemErrors).length > 0 ? itemErrors : null;
    });
    if (categoryErrors.some(err => err !== null)) {
        newErrors.categories = categoryErrors;
    }

    // Validate Languages (ensuring no empty strings if added)
    if (formData.languages.some(lang => !lang.trim())) {
        newErrors.languages = "Language fields cannot be empty.";
    }
    // Validate Interests (ensuring no empty strings if added)
    if (formData.interests.some(interest => !interest.trim())) {
        newErrors.interests = "Interest fields cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateResume = async () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to generate resume");

      const blob = await res.blob();
      const pdfBlobUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfBlobUrl);
    } catch (err) {
      alert("Error generating resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFillSample = () => {
    setFormData(sampleData);
    setErrors({});
    setPdfUrl(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4 font-opensans">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h1 className="text-5xl font-extrabold text-green-700 tracking-tight mb-4 drop-shadow-md">
          Resume Builder
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Craft your professional resume with ease. Fill in your details and generate a stunning PDF.
        </p>
      </header>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="flex justify-center mb-8">
          <button
            onClick={handleFillSample}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Start with Sample Data
          </button>
        </div>

        {/* Basic info inputs */}
        <section className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <input
                        name="name"
                        onChange={handleInput}
                        value={formData.name}
                        className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Full Name (e.g., John Doe)"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <input
                        name="email"
                        onChange={handleInput}
                        value={formData.email}
                        className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Email (e.g., john.doe@example.com)"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <input
                        name="phone"
                        onChange={handleInput}
                        value={formData.phone}
                        className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Phone (e.g., 123-456-7890)"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>
                <input
                    name="linkedin"
                    onChange={handleInput}
                    value={formData.linkedin}
                    className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                    placeholder="LinkedIn Profile URL"
                />
                <input
                    name="github"
                    onChange={handleInput}
                    value={formData.github}
                    className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                    placeholder="GitHub Profile URL"
                />
                <input
                    name="portfolio"
                    onChange={handleInput}
                    value={formData.portfolio}
                    className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                    placeholder="Portfolio Website URL"
                />
            </div>
            <textarea
                name="summary"
                onChange={handleInput}
                value={formData.summary}
                className="w-full mt-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition resize-y"
                rows={4}
                placeholder="Professional Summary (e.g., Experienced software developer with a passion...)"
            />
        </section>

        {/* Categories / Skills */}
        <SectionArrayInput
          label="Skills Categories"
          section="categories"
          data={formData.categories}
          errors={errors.categories} // Pass errors down
          onChange={(i, field, val) => handleArrayChange("categories", i, field, val)}
          onAdd={() => handleAddEntry("categories", emptyEntry("categories"))}
          onRemove={(i) => handleRemoveEntry("categories", i)}
          fields={[
            { key: "title", label: "Category Title (e.g., Technical Skills)" },
            { key: "skills", label: "Skills (comma-separated, e.g., JavaScript, React)", multiline: true },
          ]}
        />

        {/* Experience */}
        <SectionArrayInput
          label="Experience"
          section="experience"
          data={formData.experience}
          errors={errors.experience}
          onChange={(i, field, val) => handleArrayChange("experience", i, field, val)}
          onAdd={() => handleAddEntry("experience", emptyEntry("experience"))}
          onRemove={(i) => handleRemoveEntry("experience", i)}
          fields={[
            { key: "title", label: "Job Title (e.g., Frontend Developer)" },
            { key: "company", label: "Company (e.g., Tech Corp)" },
            { key: "years", label: "Years (e.g., 2019 - Present)" },
            { key: "description", label: "Description (e.g., Developed and maintained...)", multiline: true },
          ]}
        />

        {/* Education */}
        <SectionArrayInput
          label="Education"
          section="education"
          data={formData.education}
          errors={errors.education}
          onChange={(i, field, val) => handleArrayChange("education", i, field, val)}
          onAdd={() => handleAddEntry("education", emptyEntry("education"))}
          onRemove={(i) => handleRemoveEntry("education", i)}
          fields={[
            { key: "degree", label: "Degree (e.g., BSc Computer Science)" },
            { key: "institution", label: "Institution (e.g., State University)" },
            { key: "year", label: "Year (e.g., 2018)" },
          ]}
        />

        {/* Certifications */}
        <SectionArrayInput
          label="Certifications"
          section="certifications"
          data={formData.certifications}
          errors={errors.certifications}
          onChange={(i, field, val) => handleArrayChange("certifications", i, field, val)}
          onAdd={() => handleAddEntry("certifications", emptyEntry("certifications"))}
          onRemove={(i) => handleRemoveEntry("certifications", i)}
          fields={[
            { key: "title", label: "Certification Title (e.g., AWS Certified Developer)" },
            { key: "issuer", label: "Issuer (e.g., Amazon)" },
            { key: "year", label: "Year (e.g., 2021)" },
          ]}
        />

        {/* Projects */}
        <SectionArrayInput
          label="Projects"
          section="projects"
          data={formData.projects}
          errors={errors.projects}
          onChange={(i, field, val) => handleArrayChange("projects", i, field, val)}
          onAdd={() => handleAddEntry("projects", emptyEntry("projects"))}
          onRemove={(i) => handleRemoveEntry("projects", i)}
          fields={[
            { key: "name", label: "Project Name (e.g., Portfolio Website)" },
            { key: "summary", label: "Summary (e.g., A personal portfolio website...)", multiline: true },
            { key: "link", label: "Project Link (e.g., https://yourproject.com)" },
          ]}
        />

        {/* Links */}
        <SectionArrayInput
          label="Additional Links"
          section="links"
          data={formData.links}
          onChange={(i, field, val) => handleArrayChange("links", i, field, val)}
          onAdd={() => handleAddEntry("links", emptyEntry("links"))}
          onRemove={(i) => handleRemoveEntry("links", i)}
          fields={[
            { key: "label", label: "Label (e.g., Blog)" },
            { key: "url", label: "URL (e.g., https://blog.johndoe.com)" },
          ]}
        />

        {/* Languages */}
        <SectionStringArrayInput
          label="Languages"
          section="languages"
          data={formData.languages}
          errors={errors.languages}
          onChange={(i, val) => handleArrayStringChange("languages", i, val)}
          onAdd={() => handleAddEntry("languages", "")}
          onRemove={(i) => handleRemoveEntry("languages", i)}
        />

        {/* Interests */}
        <SectionStringArrayInput
          label="Interests"
          section="interests"
          data={formData.interests}
          errors={errors.interests}
          onChange={(i, val) => handleArrayStringChange("interests", i, val)}
          onAdd={() => handleAddEntry("interests", "")}
          onRemove={(i) => handleRemoveEntry("interests", i)}
        />

        <div className="flex flex-col items-center mt-10 gap-6">
          <button
            onClick={handleGenerateResume}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Resume"
            )}
          </button>
          {pdfUrl && (
            <div className="w-full mt-6 bg-gray-50 rounded-lg shadow-inner p-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Resume Preview</h3>
              <iframe
                src={pdfUrl}
                title="Resume PDF Preview"
                className="w-full h-[700px] border border-gray-300 rounded-lg shadow-md"
              />
              <div className="text-center mt-4">
                <a
                  href={pdfUrl}
                  download="Your_Resume.pdf"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
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

// --- SectionArrayInput Component ---
const SectionArrayInput = ({
  label,
  section,
  data,
  errors, // This will now be an array of errors or a string
  onChange,
  onAdd,
  onRemove,
  fields,
}) => (
  <section className="my-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{label}</h2>
    {/* Display general error for the section if it's a string */}
    {typeof errors === 'string' && (
      <p className="text-red-600 text-sm mb-4 font-semibold">{errors}</p>
    )}
    {data.map((item, idx) => (
      <div
        key={idx}
        className="p-5 mb-4 border border-gray-200 rounded-lg shadow-md bg-white relative"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(({ key, label, multiline }) => {
            const itemErrors = Array.isArray(errors) ? errors[idx] : null;
            const hasError = itemErrors && itemErrors[key];
            return multiline ? (
              <div key={key} className="w-full">
                <textarea
                  placeholder={label}
                  value={item[key]}
                  onChange={(e) => onChange(idx, key, e.target.value)}
                  rows={3}
                  className={`p-3 border rounded-lg resize-y w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${hasError ? "border-red-500" : "border-gray-300"}`}
                />
                {hasError && <p className="text-red-500 text-sm mt-1">{itemErrors[key]}</p>}
              </div>
            ) : (
              <div key={key} className="w-full">
                <input
                  placeholder={label}
                  value={item[key]}
                  onChange={(e) => onChange(idx, key, e.target.value)}
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${hasError ? "border-red-500" : "border-gray-300"}`}
                />
                {hasError && <p className="text-red-500 text-sm mt-1">{itemErrors[key]}</p>}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onRemove(idx)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
    <button
      onClick={onAdd}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium mt-2"
    >
      Add {label}
    </button>
  </section>
);

// --- SectionStringArrayInput Component ---
const SectionStringArrayInput = ({ label, section, data, onChange, onAdd, onRemove, errors }) => (
  <section className="my-8 p-6 border rounded-lg bg-gray-50 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{label}</h2>
    {errors && typeof errors === 'string' && (
      <p className="text-red-600 text-sm mb-4 font-semibold">{errors}</p>
    )}
    {data.map((item, idx) => (
      <div
        key={idx}
        className="flex items-center gap-4 mb-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
      >
        <input
          placeholder={`${label} ${idx + 1}`}
          value={item}
          onChange={(e) => onChange(idx, e.target.value)}
          className={`p-3 border rounded-lg flex-grow focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition ${errors && !item.trim() ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          onClick={() => onRemove(idx)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={onAdd}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-medium mt-2"
    >
      Add {label}
    </button>
  </section>
);

export default ResumeBuilder;