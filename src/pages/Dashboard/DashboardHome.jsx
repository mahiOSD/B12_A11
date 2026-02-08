import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin" />;
  }

  if (user?.role === "chef") {
    return <Navigate to="/dashboard/create-meal" />;
  }

  return <Navigate to="/dashboard/user-home" />;
};

export default DashboardHome;
