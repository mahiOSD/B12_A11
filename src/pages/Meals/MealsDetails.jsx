import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://your-api.com/meal/${id}`)
      .then(res => res.json())
      .then(data => setMeal(data));
  }, [id]);

  if (!meal) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-28 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Section */}
          <div className="flex-1">
            <img 
              src={meal.image} 
              alt={meal.name} 
              className="w-full h-[400px] object-cover rounded-3xl shadow-lg" 
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{meal.name}</h1>
              <p className="text-xl text-lime-600 font-semibold">${meal.price}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y py-6">
              <div>
                <p className="text-gray-500 text-sm">Chef</p>
                <p className="font-bold">{meal.chefName} (ID: {meal.chefId})</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rating</p>
                <p className="font-bold">⭐ {meal.rating} / 5.0</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Delivery Area</p>
                <p className="font-bold">{meal.deliveryArea}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Est. Time</p>
                <p className="font-bold">{meal.deliveryTime} mins</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Ingredients:</h3>
              <p className="text-gray-600">{meal.ingredients.join(", ")}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold mb-1">About the Chef:</h3>
              <p className="text-sm text-gray-600">{meal.chefExperience}</p>
            </div>

            <button 
              onClick={() => navigate(`/checkout/${meal._id}`)}
              className="w-full bg-lime-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-lime-600 transition shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MealDetails;