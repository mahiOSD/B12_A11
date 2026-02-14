import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadingContext } from "../../../contexts/LoadingContext";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { loading, setLoading } = useContext(LoadingContext);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeFraud = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/users/fraud/${userId}`
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });

      fetchUsers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-24 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {user.status || "active"}
              </td>

              <td className="border p-2">
                {user.role !== "admin" && user.status !== "fraud" ? (
                  <button
                    onClick={() => handleMakeFraud(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Make Fraud
                  </button>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
