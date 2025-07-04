import { useEffect, useState } from "react";
import axios from "axios";

const AdminEmployerVerifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/pending-employers");
      setRequests(res.data.requests); // Adjust if your API returns differently
      setError(null);
    } catch (err) {
      setError("Failed to fetch employer verification requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/admin/approve-employer/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      alert("Failed to approve employer.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/api/admin/reject-employer/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      alert("Failed to reject employer.");
    }
  };

  if (loading) return <p>Loading employer verification requests...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (requests.length === 0) return <p>No pending employer verification requests.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Employer Verification Requests</h2>
      <ul>
        {requests.map((req) => (
          <li
            key={req._id}
            className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="mb-3 md:mb-0">
              <p><strong>Username:</strong> {req.username}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Company Name:</strong> {req.employerDetails.companyName}</p>
              <p><strong>Website:</strong> {req.employerDetails.companyWebsite}</p>
              <p><strong>Address:</strong> {req.employerDetails.companyAddress}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleApprove(req._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(req._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEmployerVerifications;
