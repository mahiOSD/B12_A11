import { useEffect, useState, useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingContext } from "../../../contexts/LoadingContext";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Favorites = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useContext(LoadingContext);

  const [favorites, setFavorites] = useState([]);

 
  const fetchFavorites = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/${user.email}`
      );
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load favorites", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.email]);

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: "Remove from Favorites?",
      text: "You can add it again later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${id}`);

      Swal.fire("Removed!", "Meal removed from favorites", "success");

      fetchFavorites();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to remove favorite", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Meals</h1>

      {favorites.length === 0 && (
        <p className="text-gray-500">No favorite meals yet</p>
      )}

      {favorites.length > 0 && (
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
                <td className="border p-2">
                  {new Date(fav.addedTime).toLocaleString()}
                </td>
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
      )}
    </div>
  );
};

export default Favorites;
