import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useAuth();
  const navigate = useNavigate();

 useEffect(() => {
 
  axios.get(`${import.meta.env.VITE_API_URL}/meals`)

    .then((res) => {
      console.log("Meals API response:", res.data); 
      if (Array.isArray(res.data)) setMeals(res.data);
      else setMeals([]);
    })
    .catch(err => console.error("Meals API error:", err));
}, []);


 
  const sortedMeals = Array.isArray(meals)
    ? [...meals].sort((a, b) =>
        sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price
      )
    : [];

  
  const handleDetails = (id) => {
    if (user) {
      navigate(`/meal/${id}`);
    } else {
      navigate("/login", { state: { from: `/meal/${id}` } });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto pt-24">
    
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Daily Meals</h1>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Sort Price: {sortOrder === "asc" ? "Low → High" : "High → Low"}
        </button>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedMeals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition"
          >
           
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
            
              <h3 className="text-xl font-bold mb-2">
                {meal.name}
              </h3>

           
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold text-gray-800">
                    Chef:
                  </span>{" "}
                  {meal.chefName}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Chef ID:
                  </span>{" "}
                  {meal.chefId}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Delivery Area:
                  </span>{" "}
                  {meal.deliveryArea}
                </p>

                <p className="text-yellow-500 font-bold">
                  ⭐ {meal.rating || "N/A"}
                </p>
              </div>

          
              <div className="flex justify-between items-center mt-5">
                <span className="text-2xl font-bold text-teal-600">
                  ${meal.price}
                </span>

                <button
                  onClick={() => handleDetails(meal._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
