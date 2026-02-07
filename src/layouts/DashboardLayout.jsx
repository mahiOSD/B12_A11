import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="pt-24 flex">

     
      <div className="w-64 bg-gray-100 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">
          {user.role?.toUpperCase()} Dashboard
        </h2>
      </div>

     
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
