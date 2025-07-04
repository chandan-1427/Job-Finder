// src/components/RequireAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user from localStorage or other storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        navigate("/profile", { replace: true });
      }
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default RequireAdmin;
