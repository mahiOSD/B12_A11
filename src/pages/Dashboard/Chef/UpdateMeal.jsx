import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/meals/${id}`)
      .then(res => setMeal(res.data));
  }, [id]);

  const handleChange = e => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    if (imageFile) {
      formData.append("foodImage", imageFile);
    }

    Object.entries(meal).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    await axios.put(
      `${import.meta.env.VITE_API_URL}/meals/${id}`,
      formData
    );

    Swal.fire("Updated!", "", "success");
    navigate("/dashboard/my-meals");
  };

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Meal</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="foodName"
          value={meal.name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          onChange={e => setImageFile(e.target.files[0])}
          className="w-full p-2 border"
        />

        <input
          name="price"
          value={meal.price || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="rating"
          value={meal.rating || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="estimatedDeliveryTime"
          value={meal.estimatedDeliveryTime || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-teal-600 text-white px-4 py-2 rounded">
          Update Meal
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
