import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const CreateMeal = () => {
  const { user } = useAuth();
  const [meal, setMeal] = useState({
    name: "",
    image: "",
    price: "",
    deliveryArea: "",
    rating: "",
  });

  const handleChange = e => setMeal({...meal, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const mealData = {
      ...meal,
      chefName: user.displayName,
      chefId: user._id,
    };
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/meals`, mealData);
      if (res.data.insertedId) alert("Meal created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create meal");
    }
  };

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Meal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Meal Name" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="deliveryArea" placeholder="Delivery Area" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="rating" placeholder="Rating" onChange={handleChange} className="w-full p-2 border rounded"/>
        <button className="w-full bg-teal-600 text-white py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateMeal;
