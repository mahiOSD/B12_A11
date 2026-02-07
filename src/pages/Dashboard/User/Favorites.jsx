import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/favorites/${user.email}`)
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, [user.email]);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Meals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(fav => (
          <div key={fav._id} className="bg-white rounded-xl shadow p-4">
            <img src={fav.image} alt={fav.mealName} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 font-bold text-lg">{fav.mealName}</h2>
            <p className="text-teal-600 font-bold">${fav.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
