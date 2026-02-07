import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then(res => {
        const myReviews = res.data.filter(r => r.userEmail === user.email);
        setReviews(myReviews);
      })
      .catch(err => console.error(err));
  }, [user.email]);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map(r => (
        <div key={r._id} className="bg-white p-4 rounded shadow mb-4">
          <p className="font-bold">{r.mealName}</p>
          <p>{r.comment}</p>
          <p className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
