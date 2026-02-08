import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ChefRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user?.role !== "chef") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ChefRoute;
