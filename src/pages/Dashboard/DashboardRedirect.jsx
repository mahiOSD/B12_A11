import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/dashboard/admin" replace />;
    case "chef":
      return <Navigate to="/dashboard/create-meal" replace />;
    default:
      return <Navigate to="/dashboard/user-home" replace />;
  }
};

export default DashboardRedirect;
