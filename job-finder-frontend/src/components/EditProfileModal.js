import { Dialog } from "@headlessui/react";
import ResumeUploader from "./ResumeUploader";

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

const EditProfileModal = ({ isOpen, onClose, formData, setFormData, handleSave, saving }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-2xl w-full">
          <Dialog.Title className="text-xl font-bold mb-4 text-center">Edit Profile</Dialog.Title>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} />
            <InputField label="Highest Degree" name="highestDegree" value={formData.highestDegree} onChange={handleChange} />
            <InputField label="Studied At" name="studiedAt" value={formData.studiedAt} onChange={handleChange} />
            <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
            <InputField label="Completed Projects" name="completedProjects" value={formData.completedProjects} onChange={handleChange} />
            <InputField label="Ongoing Projects" name="ongoingProjects" value={formData.ongoingProjects} onChange={handleChange} />
            <InputField label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            <InputField label="Previous Companies" name="previousCompanies" value={formData.previousCompanies} onChange={handleChange} />
            <InputField label="Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            <InputField label="Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
            <InputField label="Address" name="contactAddress" value={formData.contactAddress} onChange={handleChange} />
          </div>

          <ResumeUploader />

          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
