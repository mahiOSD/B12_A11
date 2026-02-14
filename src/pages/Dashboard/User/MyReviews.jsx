import { useEffect, useState, useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { LoadingContext } from "../../../contexts/LoadingContext";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useContext(LoadingContext);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      const myReviews = res.data.filter(r => r.userEmail === user.email);
      setReviews(myReviews);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
      fetchReviews();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  const handleUpdate = async (review) => {
    const { value: newComment } = await Swal.fire({
      title: "Update Review",
      input: "textarea",
      inputLabel: "Edit your comment",
      inputValue: review.comment,
      showCancelButton: true,
    });

    if (!newComment) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
        rating: review.rating,
        comment: newComment,
      });
      Swal.fire("Updated!", "Your review has been updated.", "success");
      fetchReviews();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

      {reviews.length === 0 && (
        <p className="text-center text-gray-500">No reviews yet</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white p-4 rounded shadow">
            <p className="font-bold text-lg">{r.mealName}</p>
            <p>Rating: {r.rating}</p>
            <p>Comment: {r.comment}</p>
            <p className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleUpdate(r)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default MyReviews;
