import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [meal, setMeal] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [mealRes, reviewRes] = await Promise.all([
          axiosSecure.get(`/meals/${id}`),
          axiosSecure.get(`/reviews/${id}`)
        ]);

        setMeal(mealRes.data);
        setReviews(Array.isArray(reviewRes.data) ? reviewRes.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, axiosSecure]);


  const handleFavorite = async () => {
    if (user?.role !== "user") {
      return Swal.fire("Warning", "Only customers can add favorites", "warning");
    }

    const favData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.name,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/favorites", favData);

    if (res.data.message === "Already added") {
      Swal.fire("Info", "Already in favorites", "info");
    } else {
      Swal.fire("Success", "Added to favorites!", "success");
    }
  };

  
  const handleReview = async (e) => {
    e.preventDefault();

    if (user?.role !== "user") {
      return Swal.fire("Warning", "Only customers can review meals", "warning");
    }

    const comment = e.target.comment.value;
    const rating = parseInt(e.target.rating.value);

    const reviewData = {
      foodId: meal._id,
      reviewerName: user.displayName,
      reviewerImage:
        user.photoURL || "https://i.ibb.co/sample-user.jpg",
      userEmail: user.email,
      rating,
      comment,
      date: new Date().toISOString()
    };

    const res = await axiosSecure.post("/reviews", reviewData);

    if (res.data.insertedId) {
      Swal.fire("Success", "Review submitted successfully!", "success");

      setReviews([reviewData, ...reviews]);
      e.target.reset();
    }
  };

  if (loading) return <div className="text-center pt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 pt-28">

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-10">

        <img
          src={meal.image}
          alt={meal.name}
          className="rounded-3xl shadow-lg h-96 w-full object-cover"
        />

        <div className="space-y-4">

          <h1 className="text-4xl font-bold">{meal.name}</h1>

          <p className="text-gray-600">
            Chef: {meal.chefName} (ID: {meal.chefId})
          </p>

          <div className="flex gap-4 items-center">
            <span className="text-3xl font-bold text-teal-600">
              ${meal.price}
            </span>
            <span className="text-yellow-500 font-bold text-xl">
              ⭐ {meal.rating}
            </span>
          </div>

       
          <div>
            <strong>Ingredients:</strong>
            {meal.ingredients?.length > 0 ? (
              <ul className="list-disc pl-5">
                {meal.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No ingredients provided</p>
            )}
          </div>

          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {meal.estimatedDeliveryTime}
          </p>

          <p className="bg-gray-100 p-4 rounded-lg italic">
            "{meal.chefExperience}"
          </p>

         
          {user?.role === "user" ? (
            <div className="flex gap-4 pt-4">

              <button
                onClick={() => navigate(`/order/${meal._id}`)}
                className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700"
              >
                Order Now
              </button>

              <button
                onClick={handleFavorite}
                className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-600"
              >
                Favorite
              </button>

            </div>
          ) : (
            <p className="text-red-500 font-semibold">
              Only customers can order or favorite meals
            </p>
          )}

        </div>
      </div>

    
      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Reviews ({reviews.length})
        </h2>

     {user?.role === "user" && (
          <form
            onSubmit={handleReview}
            className="mb-10 bg-gray-50 p-6 rounded-2xl"
          >

            <select
              name="rating"
              className="mb-4 block p-2 border rounded"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>

            <textarea
              name="comment"
              required
              className="w-full p-4 border rounded-xl mb-4"
              placeholder="Write your review..."
            />

            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg"
            >
              Give Review
            </button>

          </form>
        )}

      <div className="space-y-6">
          {reviews.map((r, idx) => (
            <div
              key={r._id || idx}
              className="flex gap-4 border-b pb-4"
            >

              <img
                src={r.reviewerImage}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-bold">
                  {r.reviewerName}
                  <span className="text-yellow-500 ml-2">
                    ⭐ {r.rating}
                  </span>
                </p>

                <p className="text-gray-600 italic">
                  "{r.comment}"
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.date).toLocaleDateString()}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MealDetails;
