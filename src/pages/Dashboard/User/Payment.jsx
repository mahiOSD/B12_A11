import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/orders/order/${id}`)
    .then(res => setOrder(res.data))
    .catch(err => console.error(err));
}, [id]);


  const handlePayment = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/pay/${id}`
      );

      alert("Payment Successful");

      navigate("/dashboard/payment-success");

    } catch (error) {
      console.error(error);
    }
  };

  if (!order) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <div className="pt-24 max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment Page</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold">{order.mealName}</h2>
        <p>Chef: {order.chefName}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Total Price: ${order.price * order.quantity}</p>

        <button
          onClick={handlePayment}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
