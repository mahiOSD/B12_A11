import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/dashboard/profile" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          My Profile
        </Link>
        <Link to="/dashboard/my-orders" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          My Orders
        </Link>
        <Link to="/dashboard/my-reviews" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          My Reviews
        </Link>
        <Link to="/dashboard/favorites" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          Favorite Meals
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
