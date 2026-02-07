import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/role-requests`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/role-requests/${id}`, { action });
      fetchRequests(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 pt-32 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Role Requests</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Request Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td className="border p-2">{req.userName}</td>
              <td className="border p-2">{req.userEmail}</td>
              <td className="border p-2">{req.requestType}</td>
              <td className="border p-2">{req.requestStatus}</td>
              <td className="border p-2">{new Date(req.requestTime).toLocaleString()}</td>
              <td className="border p-2 flex gap-2 justify-center">
                {req.requestStatus === "pending" && (
                  <>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(req._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(req._id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
