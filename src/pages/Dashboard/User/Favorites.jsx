import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/favorites/${user.email}`)
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchFavorites();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Remove this meal from favorites?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${id}`);
      alert("Meal removed from favorites successfully");
      fetchFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Meals</h1>
      {favorites.length === 0 && <p>No favorite meals yet</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Meal Name</th>
            <th className="border p-2">Chef Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Date Added</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(fav => (
            <tr key={fav._id}>
              <td className="border p-2">{fav.mealName}</td>
              <td className="border p-2">{fav.chefName}</td>
              <td className="border p-2">${fav.price}</td>
              <td className="border p-2">{new Date(fav.addedTime).toLocaleString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(fav._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
