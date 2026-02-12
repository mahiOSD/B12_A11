import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { user, setUser } = useAuth();

  const [meal, setMeal] = useState({
    foodName: "",
    price: "",
    rating: "",
    ingredients: [],
    estimatedDeliveryTime: "",
    chefExperience: "",
    chefName: user?.displayName || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
  if (user?.email) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then(res => {
        setUser(prev => ({
          ...prev,
          ...res.data
        }));
      })
      .catch(err => console.error(err));
  }
}, [user?.email, setUser]);



  useEffect(() => {
    if (user?.displayName) {
      setMeal(prev => ({
        ...prev,
        chefName: user.displayName,
      }));
    }
  }, [user]);

  const handleChange = e => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setMeal({
        ...meal,
        ingredients: [...meal.ingredients, ingredientInput.trim()],
      });
      setIngredientInput("");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!imageFile)
      return Swal.fire("Error", "Please upload an image", "error");

    const formData = new FormData();
    formData.append("foodImage", imageFile);

    Object.entries({
      ...meal,
      chefId: user?.chefId,
      userEmail: user?.email,
    }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.insertedId) {
        Swal.fire("Success", "Meal created successfully", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    }
  };

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Meal</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
       
        <input
          name="foodName"
          placeholder="Food Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <input
          value={user?.displayName || ""}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

       
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />

       
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          step="0.1"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <div className="flex gap-2">
          <input
            value={ingredientInput}
            onChange={e => setIngredientInput(e.target.value)}
            placeholder="Add Ingredient"
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-teal-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <p>Ingredients: {meal.ingredients.join(", ")}</p>

      
        <input
          name="estimatedDeliveryTime"
          placeholder="Estimated Delivery Time"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

      
        <input
          value={user?.chefId || "Not assigned yet"}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        
        <input
          name="chefExperience"
          placeholder="Chef Experience"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <input
          value={user?.email || ""}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <button className="w-full bg-teal-600 text-white py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
