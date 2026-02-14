import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

 

const MyOrders = () => {

  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { handleSubmit } = useForm();
  useEffect(() => {
    document.title = "My order";
  }, []);

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

  const onPay = (orderId) => {
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
        {orders.map(order => {
          const totalPrice = order.price * order.quantity;

          return (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">{order.mealName}</h2>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ${totalPrice}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Payment Status: {order.paymentStatus}</p>

              {/* React Hook Form handleSubmit ব্যবহার করে */}
              {order.orderStatus === "accepted" &&
                order.paymentStatus?.toLowerCase() === "pending" && (
                  <form onSubmit={handleSubmit(() => onPay(order._id))}>
                    <button
                      type="submit"
                      className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                      Pay Now
                    </button>
                  </form>
                )}

              {order.paymentStatus?.toLowerCase() === "paid" && (
                <div className="mt-4 text-green-600 font-semibold text-center">
                  Payment Completed
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
