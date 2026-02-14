import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingContext } from "../../../contexts/LoadingContext";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const { loading, setLoading } = useContext(LoadingContext);

 
  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/meals/${id}`
        );
        setMeal(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load meal", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id, setLoading]);

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

    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/meals/${id}`,
        formData
      );

      Swal.fire("Success", "Meal updated successfully", "success");
      navigate("/dashboard/my-meals");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update meal", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-24 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Meal</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          name="foodName"
          value={meal.foodName || ""}
          onChange={handleChange}
          placeholder="Food Name"
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
          placeholder="Price"
          className="w-full p-2 border rounded"
        />

       
        <input
          name="rating"
          value={meal.rating || ""}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-2 border rounded"
        />

    
        <input
          name="estimatedDeliveryTime"
          value={meal.estimatedDeliveryTime || ""}
          onChange={handleChange}
          placeholder="Estimated Delivery Time"
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
