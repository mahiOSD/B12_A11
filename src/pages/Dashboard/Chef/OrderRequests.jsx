import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const OrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/orders`)
      .then(res => setOrders(res.data.filter(o => o.chefId === user._id)))
      .catch(err => console.error(err));
  }, [user._id]);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Requests</h1>
      {orders.length === 0 && <p>No order requests yet</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Meal</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border p-2">{order.mealName}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">${order.price * order.quantity}</td>
              <td className="border p-2">{order.userEmail}</td>
              <td className="border p-2">{order.userAddress}</td>
              <td className="border p-2">{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderRequests;
