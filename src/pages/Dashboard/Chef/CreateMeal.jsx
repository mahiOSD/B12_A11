import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { user, setUser } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    document.title = "Create meal";
  }, []);

 
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then(res => setUser(prev => ({ ...prev, ...res.data })))
        .catch(err => console.error(err));
    }
  }, [user?.email, setUser]);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients(prev => [...prev, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) {
      return Swal.fire("Error", "Please upload an image", "error");
    }

    const formData = new FormData();
    formData.append("foodImage", imageFile);

    
    ingredients.forEach(ing => formData.append("ingredients", ing));

   
    const mealData = {
      ...data,
      chefName: user?.displayName,
      chefId: user?.chefId,
      userEmail: user?.email
    };

    Object.entries(mealData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.insertedId) {
        Swal.fire("Success", "Meal created successfully", "success");
        reset();          
        setIngredients([]); 
        setImageFile(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create meal", "error");
    }
  };

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
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
          {...register("price", { required: true, min: 1 })}
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
        />

        <input
          {...register("rating", { required: true, min: 0, max: 5 })}
          type="number"
          placeholder="Rating"
          step="0.1"
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

        <p>Ingredients: {ingredients.join(", ")}</p>

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time"
          className="w-full p-2 border rounded"
        />

        <input
          value={user?.chefId || "Not assigned yet"}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <input
          {...register("chefExperience", { required: true })}
          placeholder="Chef Experience"
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
