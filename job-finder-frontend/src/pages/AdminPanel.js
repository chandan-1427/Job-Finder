// src/pages/AdminPanel.jsx
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-3">
        <Link
          to="/admin/employer-verifications"
          className="text-blue-600 hover:underline"
        >
          Employer Verification Requests
        </Link>
        {/* Add other admin links here */}
      </nav>
    </div>
  );
};

export default AdminPanel;
