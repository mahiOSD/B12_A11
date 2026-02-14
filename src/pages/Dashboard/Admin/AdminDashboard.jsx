import { useEffect } from "react";

const AdminDashboard = () => {

  useEffect(() => {
    document.title = "Admin";
  }, []);
  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
      <p className="text-lg text-gray-700">
        This is your dashboard. From here, you can manage users, requests, and view platform statistics.
      </p>
    </div>
  );
};

export default AdminDashboard;
