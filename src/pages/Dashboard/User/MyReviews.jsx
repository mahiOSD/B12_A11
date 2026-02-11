import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      alert("Review deleted successfully");
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (review) => {
    const newComment = prompt("Update your review:", review.comment);
    if (!newComment) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
        rating: review.rating,
        comment: newComment,
      });
      alert("Review updated successfully");
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 && <p>No reviews yet</p>}

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
