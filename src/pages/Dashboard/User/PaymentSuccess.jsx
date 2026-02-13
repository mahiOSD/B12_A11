import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 
      </h1>

      <p className="mt-4 text-gray-600">
        Your order payment has been completed successfully.
      </p>

      <button
        onClick={() => navigate("/dashboard/my-orders")}
        className="mt-6 bg-teal-600 text-white px-6 py-2 rounded"
      >
        Go To My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
