import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const MyMeals = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/meals`)
      .then(res => setMeals(res.data.filter(m => m.chefId === user._id)))
      .catch(err => console.error(err));
  }, [user._id]);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Meals</h1>
      {meals.length === 0 && <p>No meals yet</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map(meal => (
          <div key={meal._id} className="bg-white p-4 rounded shadow">
            <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded"/>
            <h2 className="font-bold mt-2">{meal.name}</h2>
            <p className="text-teal-600 font-bold">${meal.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMeals;
