import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/orders/${user.email}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user.email]);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Meal</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Order Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border p-2">{order.mealName}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">${order.price * order.quantity}</td>
              <td className="border p-2">{order.orderStatus}</td>
              <td className="border p-2">{new Date(order.orderTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
