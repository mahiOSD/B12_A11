import { Link } from "react-router-dom";
import { useEffect } from "react";
const UserDashboard = () => {
  useEffect(() => {
    document.title = "User-home";
  }, []);
  return (
    <div className="pt-24 flex justify-center items-center min-h-[70vh]">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Dashboard 
        </h1>

        <p className="text-gray-600 text-lg">
          From here you can manage your orders, reviews, and favorite meals.
          Use the menu on the left side to navigate through different options.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
