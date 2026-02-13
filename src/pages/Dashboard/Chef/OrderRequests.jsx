import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const OrderRequests = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user?.chefId) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chef-orders/${user.chefId}`);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleAction = async (orderId, action) => {
    try {
     
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, { action });
      if (res.data.modifiedCount > 0) {
       
        setOrders(prevOrders =>
          prevOrders.map(o =>
            o._id === orderId
              ? { ...o, orderStatus: action === "cancel" ? "cancelled" : action === "accept" ? "accepted" : "delivered" }
              : o
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="pt-24 text-center">Loading orders...</p>;

  if (orders.length === 0) return <p className="pt-24 text-center">No order requests yet.</p>;

  return (
    <div className="pt-24 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Requests</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map(order => {
          const { _id, mealName, price, quantity, orderStatus, userEmail, orderTime, userAddress, paymentStatus } = order;

          const isCancelled = orderStatus === "cancelled";
          const isAccepted = orderStatus === "accepted";
          const isDelivered = orderStatus === "delivered";
          const isPending = orderStatus === "pending";

          return (
            <div key={_id} className="bg-white shadow rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-xl mb-2">{mealName}</h2>
                <p><strong>User Email:</strong> {userEmail}</p>
                <p><strong>User Address:</strong> {userAddress}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Order Time:</strong> {new Date(orderTime).toLocaleString()}</p>
                <p><strong>Payment Status:</strong> {paymentStatus}</p>
                <p><strong>Order Status:</strong> {orderStatus}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
                  disabled={isCancelled || isAccepted || isDelivered}
                  onClick={() => handleAction(_id, "cancel")}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                  disabled={!isPending}
                  onClick={() => handleAction(_id, "accept")}
                >
                  Accept
                </button>

                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                  disabled={!isAccepted}
                  onClick={() => handleAction(_id, "deliver")}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequests;
