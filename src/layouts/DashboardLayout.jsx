import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <Navbar />

      <div className="pt-24 flex">
        <div className="w-64 bg-gray-100 min-h-screen p-4">
          <h2 className="text-xl font-bold mb-6">
            {user.role?.toUpperCase()} Dashboard
          </h2>

          <div className="flex flex-col gap-3">
            {user.role === "user" && (
              <>
                <NavLink to="/dashboard/user-home">User Home</NavLink>
                <NavLink to="/dashboard/profile">My Profile</NavLink>
                <NavLink to="/dashboard/my-orders">My Orders</NavLink>
                <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
                <NavLink to="/dashboard/favorites">Favorites</NavLink>
              </>
            )}

            {user.role === "chef" && (
              <>
                <NavLink to="/dashboard/create-meal">Create Meal</NavLink>
                <NavLink to="/dashboard/my-meals">My Meals</NavLink>
                <NavLink to="/dashboard/order-requests">Order Requests</NavLink>
              </>
            )}

            {user.role === "admin" && (
              <>
                <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>
                <NavLink to="/dashboard/profile">My Profile</NavLink>
                <NavLink to="/dashboard/manage-users">Manage User</NavLink>
                <NavLink to="/dashboard/manage-requests">Manage Request</NavLink>
                <NavLink to="/dashboard/statistics">Platform Statistics</NavLink>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default DashboardLayout;
