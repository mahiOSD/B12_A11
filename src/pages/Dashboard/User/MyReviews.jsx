import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then(res => {
        const myReviews = res.data.filter(r => r.userEmail === user.email);
        setReviews(myReviews);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchReviews();
  }, [user?.email]);

  useEffect(() => {
    document.title = "My review";
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onUpdate = async (data, review) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
        rating: review.rating,
        comment: data.comment
      });
      Swal.fire("Success", "Review updated successfully!", "success");
      fetchReviews();
      reset(); 
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update review", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        fetchReviews();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete review", "error");
      }
    }
  };

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 && <p>No reviews yet</p>}

      <div className="grid grid-cols-1 gap-4">
        {reviews.map(r => (
          <form
            key={r._id}
            onSubmit={handleSubmit((data) => onUpdate(data, r))}
            className="bg-white p-4 rounded shadow space-y-2"
          >
            <p className="font-bold text-lg">{r.mealName}</p>
            <p>Rating: {r.rating}</p>

            <textarea
              {...register("comment", { required: true })}
              defaultValue={r.comment}
              className="w-full p-2 border rounded"
            ></textarea>

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => handleDelete(r._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
