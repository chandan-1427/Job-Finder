import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Profile = ({ user, openModal }) => {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [showOptions, setShowOptions] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const latestResume = user.resumes?.length
    ? user.resumes[user.resumes.length - 1]
    : null;

  const handleAvatarClick = () => setShowOptions((prev) => !prev);

  const triggerFileInput = () => {
    fileInputRef.current.click();
    setShowOptions(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    setUploading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/upload-profile-picture", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.imageUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/delete-profile-picture", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setProfileImage(null);
      else alert(data.error || "Delete failed");
    } catch (err) {
      alert("Delete failed.");
    }
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    if (showOptions) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  const fields = [
    user.fullname,
    user.highestDegree,
    user.studiedAt,
    user.skills?.length,
    user.completedProjects?.length,
    user.ongoingProjects?.length,
    user.experience,
    user.previousCompanies?.length,
    user.contactInfo?.phone,
    user.contactInfo?.email,
    user.contactInfo?.address,
  ];
  const filledFields = fields.filter(Boolean).length;
  const completionPercent = Math.floor((filledFields / fields.length) * 100);

  return (
    <div className="mt-20 w-full px-6 md:px-16">
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50"
          >
            Profile picture updated!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column – Avatar + Info */}
        <div className="bg-gray-50 p-8 flex flex-col items-center text-center relative">
          <div
            onClick={handleAvatarClick}
            onKeyDown={(e) => e.key === "Enter" && handleAvatarClick()}
            role="button"
            tabIndex={0}
            ref={dropdownRef}
            className="relative group outline-none"
          >
            {uploading ? (
              <div className="w-36 h-36 flex items-center justify-center rounded-full border-4 border-blue-400 animate-pulse bg-blue-100 text-sm text-blue-600">
                Uploading...
              </div>
            ) : profileImage ? (
              <img
                src={`http://localhost:5000/uploads/profile-pictures/${profileImage}`}
                alt={`${user.username}'s profile`}
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <FaUserCircle className="text-[140px] text-blue-400 hover:text-blue-600 transition" />
            )}

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded border z-20 w-40"
                >
                  <button
                    onClick={triggerFileInput}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Upload New
                  </button>
                  {profileImage && (
                    <button
                      onClick={handleDeleteImage}
                      className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Delete Picture
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            accept="image/*"
          />
          <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>

          <div className="mt-4 w-full text-left">
            <p className="text-sm mb-1 font-medium">
              Profile Completion: {completionPercent}%
            </p>
            <div className="w-full bg-gray-300 h-3 rounded-full">
              <motion.div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>

        {/* Right Column – User Info */}
        <div className="lg:col-span-2 p-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Personal & Professional Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-800">
            <p><strong>Full Name:</strong> {user.fullname || "-"}</p>
            <p><strong>Highest Degree:</strong> {user.highestDegree || "-"}</p>
            <p><strong>Studied At:</strong> {user.studiedAt || "-"}</p>
            <p><strong>Experience:</strong> {user.experience || "-"}</p>
            <p><strong>Skills:</strong> {(user.skills || []).join(", ") || "-"}</p>
            <p><strong>Completed Projects:</strong> {(user.completedProjects || []).join(", ") || "-"}</p>
            <p><strong>Ongoing Projects:</strong> {(user.ongoingProjects || []).join(", ") || "-"}</p>
            <p><strong>Previous Companies:</strong> {(user.previousCompanies || []).join(", ") || "-"}</p>
            <p><strong>Phone:</strong> {user.contactInfo?.phone || "-"}</p>
            <p><strong>Email:</strong> {user.contactInfo?.email || "-"}</p>
            <p><strong>Address:</strong> {user.contactInfo?.address || "-"}</p>
          </div>

          {latestResume ? (
            <a
              href={`http://localhost:5000/uploads/resumes/${latestResume.filename}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              📄 View Latest Resume
            </a>
          ) : (
            <p className="text-gray-500">No resume uploaded yet</p>
          )}

          {/* Activity Feed */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h4 className="text-md font-semibold mb-2">Recent Activity</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              {user.activityLog?.length ? (
                user.activityLog.slice(0, 5).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>No recent activity</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
