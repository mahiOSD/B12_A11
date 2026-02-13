import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyMeals = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const fetchMeals = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/meals`)
      .then(res => {
          console.log("All meals:", res.data);
        const myMeals = res.data.filter(
          m => m.chefId === user?.chefId
        );
        console.log("My meals:", myMeals);
        setMeals(myMeals);
      });
  };

  useEffect(() => {
    if (user?.chefId) {
      fetchMeals();
    }
  }, [user]);

  
  const handleDelete = id => {
    Swal.fire({
      title: "Delete Meal?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/meals/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "", "success");
            fetchMeals();
          });
      }
    });
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Meals</h1>

      {meals.length === 0 && <p>No meals yet</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {meals.map(meal => (
          <div key={meal._id} className="bg-white p-4 rounded shadow">
            <img
              src={`${import.meta.env.VITE_API_URL}${meal.image}`}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="font-bold mt-2">{meal.name}</h2>
            <p>Price: ${meal.price}</p>
            <p>Rating: {meal.rating}</p>
            <p>
  Ingredients: {Array.isArray(meal.ingredients)
    ? meal.ingredients.join(", ")
    : "No ingredients"}
</p>

            <p>Delivery: {meal.estimatedDeliveryTime}</p>
            <p>Chef: {meal.chefName}</p>
            <p>Chef ID: {meal.chefId}</p>

            <div className="flex gap-3 mt-3">
              <button
  onClick={() => navigate(`/dashboard/update-meal/${meal._id}`)}
  className="bg-blue-500 text-white px-3 py-1 rounded"
>
  Update
</button>


              <button
                onClick={() => handleDelete(meal._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
