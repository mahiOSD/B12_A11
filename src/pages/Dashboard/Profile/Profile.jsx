import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then(res => setUserInfo(res.data))
      .catch(err => console.error(err));
  }, [user.email]);

  const handleRequest = async (type) => {
    const requestPayload = {
  userName: userInfo.name,
  userEmail: userInfo.email,
  requestType: type,
};

try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/role-request`, requestPayload);
      if (res.data.insertedId) {
        alert(`Request sent for ${type}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white rounded-xl shadow-md">
      <img src={userInfo.image} alt={userInfo.name} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-2xl font-bold mt-4 text-center">{userInfo.name}</h2>
      <p className="text-center">{userInfo.email}</p>
      <p className="text-center">{userInfo.address}</p>
      <p className="text-center font-semibold">{userInfo.role}</p>
      <p className="text-center">{userInfo.status}</p>
      {userInfo.role === "chef" && <p className="text-center">Chef ID: {userInfo.chefId}</p>}

      <div className="flex justify-center gap-4 mt-4">
        {userInfo.role !== "chef" && userInfo.role !== "admin" && (
          <button
            onClick={() => handleRequest("chef")}
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            Be a Chef
          </button>
        )}
        {userInfo.role !== "admin" && (
          <button
            onClick={() => handleRequest("admin")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Be an Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
