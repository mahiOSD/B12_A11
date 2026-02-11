import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const OrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

   axios
  .get(`${import.meta.env.VITE_API_URL}/chef-orders/${user.chefId}`)

      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="pt-24 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Requests</h1>

      {orders.length === 0 && <p>No order requests yet</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow rounded-xl p-4">
            <h2 className="font-bold text-xl">{order.mealName}</h2>

            <p>User Email: {order.userEmail}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ${order.price * order.quantity}</p>
            <p>Status: {order.orderStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderRequests;
