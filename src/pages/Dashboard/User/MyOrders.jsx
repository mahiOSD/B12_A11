import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/${user.email}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user?.email]);

  const handlePay = (order) => {
   
    navigate(`/payment/${order._id}`);
  };

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold text-xl">{order.mealName}</h2>
            <p>Chef Name: {order.chefName}</p>
            <p>Chef ID: {order.chefId}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price * order.quantity}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <p>Delivery Time: {new Date(order.orderTime).toLocaleString()}</p>

            {order.orderStatus === "accepted" && order.paymentStatus === "Pending" && (
              <button
                onClick={() => handlePay(order)}
                className="mt-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Pay
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
