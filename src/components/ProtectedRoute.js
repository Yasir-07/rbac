import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
      setLoading(false);
    } else if (!allowedRoles.includes(currentUser.role)) {
      navigate("/login");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [currentUser, allowedRoles, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
