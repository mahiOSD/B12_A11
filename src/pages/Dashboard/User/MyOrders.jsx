import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${user.email}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

 
  const handlePay = (orderId) => {
  navigate(`/dashboard/payment/${orderId}`);
};


  if (loading || isLoading) {
    return (
      <div className="pt-24 text-center text-lg font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

     
      {orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found</p>
      )}

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => {
          const totalPrice = order.price * order.quantity;

          return (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
            
              <h2 className="text-xl font-bold mb-2">{order.mealName}</h2>

             
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold">Chef Name:</span>{" "}
                  {order.chefName || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Chef ID:</span>{" "}
                  {order.chefId || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.quantity}
                </p>

                <p>
                  <span className="font-semibold">Price:</span> ${totalPrice}
                </p>

                <p>
                  <span className="font-semibold">Order Status:</span>{" "}
                  <span className="capitalize">{order.orderStatus}</span>
                </p>

                <p>
                  <span className="font-semibold">Payment Status:</span>{" "}
                  <span className="capitalize">
                    {order.paymentStatus}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Delivery Time:</span>{" "}
                  {order.orderTime
                    ? new Date(order.orderTime).toLocaleString()
                    : "N/A"}
                </p>
              </div>

            
              {order.orderStatus === "accepted" &&
                order.paymentStatus?.toLowerCase() === "pending" && (
                  <button
                    onClick={() => handlePay(order._id)}
                    className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                  >
                    Pay Now
                  </button>
                )}

             
              {order.paymentStatus?.toLowerCase() === "paid" && (
                <div className="mt-4 text-green-600 font-semibold text-center">
                  Payment Completed ✔
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
