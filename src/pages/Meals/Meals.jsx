import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import useAuth from "../../hooks/useAuth";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetching data (Using mock data for demonstration)
  useEffect(() => {
    fetch('https://your-api.com/all-meals') // Replace with your actual API
      .then(res => res.json())
      .then(data => setMeals(data));
  }, []);

  // Sorting Logic
  const sortedMeals = [...meals].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const handleDetailsNavigation = (id) => {
    if (user) {
      navigate(`/meal/${id}`);
    } else {
      navigate("/login", { state: { from: `/meal/${id}` } });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <Heading title="Available Meals" subtitle="Delicious home-cooked food in your area" />
          
          {/* Sort Button */}
          <button 
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-lime-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-lime-700 transition"
          >
            Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMeals.map((meal) => (
            <div key={meal._id} className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white">
              <img src={meal.image} alt={meal.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{meal.name}</h3>
                  <span className="bg-lime-100 text-lime-700 text-xs font-bold px-2 py-1 rounded">
                    ⭐ {meal.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Chef: {meal.chefName}</p>
                <p className="text-gray-500 text-xs">Chef ID: {meal.chefId}</p>
                <p className="text-gray-700 mt-2 font-medium">📍 {meal.deliveryArea}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-lime-600">${meal.price}</span>
                  <button 
                    onClick={() => handleDetailsNavigation(meal._id)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition text-sm"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Meals;