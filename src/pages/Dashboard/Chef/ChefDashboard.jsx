import { Link } from "react-router-dom";

const ChefDashboard = () => {
  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chef Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/dashboard/profile" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          My Profile
        </Link>
        <Link to="/dashboard/create-meal" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          Create Meal
        </Link>
        <Link to="/dashboard/my-meals" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          My Meals
        </Link>
        <Link to="/dashboard/order-requests" className="p-6 bg-white shadow rounded hover:shadow-lg transition text-center">
          Order Requests
        </Link>
      </div>
    </div>
  );
};

export default ChefDashboard;
