import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  
  if (!user.role) return <div>Loading role...</div>;

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
