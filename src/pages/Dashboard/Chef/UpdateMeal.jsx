import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    document.title = "Update meal";
  }, []);

  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/meals/${id}`)
      .then(res => {
        const mealData = res.data;
        reset(mealData); 
      })
      .catch(err => console.error(err));
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("foodImage", imageFile);
    }

  
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/meals/${id}`, formData);
      Swal.fire("Updated!", "Meal updated successfully", "success");
      navigate("/dashboard/my-meals");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
          className="w-full p-2 border rounded"
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
          step="0.1"
          placeholder="Rating"
          className="w-full p-2 border rounded"
        />

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Update Meal
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
