import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "../components/Profile";
import EditProfileModal from "../components/EditProfileModal";
import jobSeekerImg from "../assets/job-seeker.svg"; // Add a vector illustration related to job search
import companyLogo from "../assets/JF-logo-true.png"; // Add your brand logo

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    highestDegree: "",
    studiedAt: "",
    skills: "",
    completedProjects: "",
    ongoingProjects: "",
    experience: "",
    previousCompanies: "",
    contactPhone: "",
    contactEmail: "",
    contactAddress: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(data);
        setFormData({
          fullname: data.fullname || "",
          highestDegree: data.highestDegree || "",
          studiedAt: data.studiedAt || "",
          skills: (data.skills || []).join(", "),
          completedProjects: (data.completedProjects || []).join(", "),
          ongoingProjects: (data.ongoingProjects || []).join(", "),
          experience: data.experience || "",
          previousCompanies: (data.previousCompanies || []).join(", "),
          contactPhone: data.contactInfo?.phone || "",
          contactEmail: data.contactInfo?.email || "",
          contactAddress: data.contactInfo?.address || "",
        });
      } catch (error) {
        setError("⚠️ Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        fullname: formData.fullname,
        highestDegree: formData.highestDegree,
        studiedAt: formData.studiedAt,
        skills: formData.skills.split(",").map((s) => s.trim()),
        completedProjects: formData.completedProjects.split(",").map((s) => s.trim()),
        ongoingProjects: formData.ongoingProjects.split(",").map((s) => s.trim()),
        experience: formData.experience,
        previousCompanies: formData.previousCompanies.split(",").map((s) => s.trim()),
        contactInfo: {
          phone: formData.contactPhone,
          email: formData.contactEmail,
          address: formData.contactAddress,
        },
      };
      const res = await axios.put("http://localhost:5000/api/auth/update-profile", payload, {
        withCredentials: true,
      });
      setUser(res.data.user);
      alert("✅ Profile updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      alert("❌ Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-white to-blue-50">
      {/* Hero Banner */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto gap-8 px-4 lg:px-0 pb-12">
        <div className="text-center lg:text-left">
          <img src={companyLogo} alt="JobFinder Logo" className="h-12 mb-4 mx-auto lg:mx-0" />
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Welcome to Your Profile</h1>
          <p className="mt-2 text-gray-600 max-w-md">
            This is your personal dashboard to manage your career profile. Keep your information updated so companies can find you faster!
          </p>
        </div>
{user?.profileImage ? (
<img
  src={`http://localhost:5000/uploads/profile-pictures/${user.profileImage}`}
  alt={`${user.username}'s profile`}
  className="w-[300px] h-[360px] sm:w-[340px] sm:h-[400px] rounded-xl object-cover shadow-2xl border-[6px] border-blue-500 transition-transform duration-300 hover:scale-105"
/>

) : (
  <img
    src={jobSeekerImg}
    alt="Job seeker illustration"
    className="w-full max-w-sm"
    loading="lazy"
  />
)}
      </div>

      {/* Profile Area */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {loading ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 text-lg py-12"
            >
              Loading your profile...
            </motion.p>
          ) : error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-600 font-semibold text-lg py-12"
            >
              {error}
            </motion.p>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl shadow-lg bg-white p-6"
            >
              <Profile user={user} openModal={() => setIsModalOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default ProfilePage;
