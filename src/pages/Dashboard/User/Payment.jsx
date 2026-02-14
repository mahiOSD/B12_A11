import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { LoadingContext } from "../../../contexts/LoadingContext";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load order details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, setLoading]);

  const handlePayment = async () => {
    const result = await Swal.fire({
      title: "Confirm Payment",
      text: `Pay $${order.price * order.quantity} for ${order.mealName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/pay/${id}`);
      Swal.fire("Success", "Payment completed successfully", "success");
      navigate("/dashboard/payment-success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Please try again.", "error");
    }
  };

  if (loading || !order) return <LoadingSpinner />;

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
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
