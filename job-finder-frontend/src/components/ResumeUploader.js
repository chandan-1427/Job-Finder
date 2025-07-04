import { useState } from "react";

const ResumeUploader = () => {
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resume) return alert("Please select a file.");
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await fetch("http://localhost:5000/api/resume/upload-resume", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert("Resume uploaded successfully.");
      setResume(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleChange} />
      <button onClick={handleUpload} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Upload Resume
      </button>
      {resume && <p className="text-green-600 text-sm">Selected: {resume.name}</p>}
    </div>
  );
};

export default ResumeUploader;
