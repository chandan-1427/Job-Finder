import { useState, useEffect, useRef } from "react";
import axios from "axios";

const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobName: "",
    minSalary: "",
    maxSalary: "",
    workType: "",
    studyRequirement: "",
    expectedRequirements: "",
    location: "",
    jobType: "",
    applicationDeadline: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const notificationRef = useRef(null);

  useEffect(() => {
    if (showNotification && notificationRef.current) {
      notificationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showNotification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateFields = () => {
    const errors = {};
    for (const key in formData) {
      if (formData[key].toString().trim() === "") {
        errors[key] = true;
      }
    }

    if (
      formData.minSalary !== "" &&
      formData.maxSalary !== "" &&
      Number(formData.maxSalary) < Number(formData.minSalary)
    ) {
      errors.maxSalary = true;
      errors.minSalary = true;
      setError("Max Salary should be greater than or equal to Min Salary.");
    } else {
      setError("");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/job/post-job",
        formData,
        { withCredentials: true }
      );

      setSuccessMessage(response.data.message || "Job posted successfully!");
      setShowNotification(true);
      setFormData({
        companyName: "",
        jobName: "",
        minSalary: "",
        maxSalary: "",
        workType: "",
        studyRequirement: "",
        expectedRequirements: "",
        location: "",
        jobType: "",
        applicationDeadline: "",
        description: "",
      });
      setValidationErrors({});
    } catch (err) {
      setError(err.response?.data?.error || "Server error. Please try again.");
      setShowNotification(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-12 sm:px-12 flex flex-col">
      {!showNotification && (
        <>
          <header className="mb-12 max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm mb-3">
              Post Your Job
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Share your opportunity and attract top talent by posting here.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-10 space-y-6"
            noValidate
          >
            <div className="flex flex-col space-y-5">
              {[
                { name: "companyName", placeholder: "Company Name" },
                { name: "jobName", placeholder: "Job Name" },
                { name: "location", placeholder: "Job Location" },
                { name: "jobType", placeholder: "Job Type (Full-time, Part-time, etc.)" },
                { name: "workType", placeholder: "Work Type (e.g., Remote, Onsite)" },
                { name: "studyRequirement", placeholder: "Study Requirement" },
              ].map(({ name, placeholder }) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={
                    validationErrors[name] ? `* ${placeholder} is required` : placeholder
                  }
                  disabled={submitting}
                  className={`input-field ${
                    validationErrors[name] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              ))}

              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "minSalary", placeholder: "Min Salary", type: "number" },
                  { name: "maxSalary", placeholder: "Max Salary", type: "number" },
                ].map(({ name, placeholder, type }) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={
                      validationErrors[name] ? `* ${placeholder} is required` : placeholder
                    }
                    min="0"
                    disabled={submitting}
                    className={`input-field ${
                      validationErrors[name] ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>

              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                disabled={submitting}
                className={`input-field ${
                  validationErrors.applicationDeadline ? "border-red-600" : "border-gray-300"
                }`}
              />

              <textarea
                name="expectedRequirements"
                value={formData.expectedRequirements}
                onChange={handleChange}
                placeholder={
                  validationErrors.expectedRequirements
                    ? "* Expected Requirements is required"
                    : "Expected Requirements"
                }
                disabled={submitting}
                className={`input-field h-24 resize-none ${
                  validationErrors.expectedRequirements ? "border-red-600" : "border-gray-300"
                }`}
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={
                  validationErrors.description
                    ? "* Job Description is required"
                    : "Detailed Job Description"
                }
                disabled={submitting}
                className={`input-field h-32 resize-none ${
                  validationErrors.description ? "border-red-600" : "border-gray-300"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 font-semibold rounded-lg text-white shadow-md transition-transform duration-150 ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 focus:ring-0"
              }`}
            >
              {submitting ? "Posting..." : "Post Job"}
            </button>
          </form>
        </>
      )}

      {showNotification && (
        <section
          ref={notificationRef}
          className="flex flex-col items-center justify-center max-w-xl mx-auto p-10 rounded-xl bg-white shadow-lg space-y-6"
        >
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          <div className="text-center text-gray-700 max-w-md">
            <h2 className="text-2xl font-bold mb-3">Next Steps</h2>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Review the job you just posted.</li>
              <li>Check your dashboard to manage applications.</li>
              <li>You can post another job below.</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setShowNotification(false);
              setError("");
              setSuccessMessage("");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
          >
            Post Another Job
          </button>
        </section>
      )}

      <style>{`
        .input-field {
          padding: 0.75rem 1rem;
          border: 1.5px solid #CBD5E1;
          border-radius: 0.75rem;
          font-size: 1rem;
          width: 100%;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .input-field:focus {
          border-color: #2563EB;
        }
        .input-field:disabled {
          background-color: #E0E7FF;
          cursor: not-allowed;
        }
        .alert {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 600;
        }
        .alert-success {
          background-color: #D1FAE5;
          border: 1px solid #34D399;
          color: #065F46;
        }
        .alert-error {
          background-color: #FEE2E2;
          border: 1px solid #F87171;
          color: #991B1B;
        }
      `}</style>
    </div>
  );
};

export default PostJob;
