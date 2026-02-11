import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [meal, setMeal] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then(res => setMeal(res.data));
  }, [id, axiosSecure]);

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const totalPrice = meal.price * quantity;

    const confirm = await Swal.fire({
      title: 'Confirm Order',
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      const orderData = {
  foodId: meal._id,
  mealName: meal.name,
  price: meal.price,
  quantity: parseInt(quantity),

  chefId: meal.chefId,
  chefName: meal.chefName,
  chefEmail: meal.chefEmail,

  paymentStatus: "Pending",
  userEmail: user.email,
  userAddress: address,
  orderStatus: "pending",
  orderTime: new Date().toISOString()
};


      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Order placed successfully!", "success");
        navigate("/dashboard/my-orders");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 pt-32 bg-white rounded-3xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-8 text-center border-b pb-4">Order Confirmation</h1>
      <form onSubmit={handleConfirmOrder} className="space-y-5">
        <div>
          <label className="text-xs font-bold uppercase text-gray-400">Meal Name</label>
          <input type="text" readOnly value={meal.name || ""} className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase text-gray-400">Price ($)</label>
            <input type="text" readOnly value={meal.price || ""} className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400">Chef ID</label>
            <input type="text" readOnly value={meal.chefId || ""} className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-gray-400">Your Email</label>
          <input type="text" readOnly value={user?.email || ""} className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-gray-400">Quantity</label>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="w-full p-3 border rounded-lg border-teal-200" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-gray-400">Delivery Address</label>
          <textarea name="address" required placeholder="Enter full address..." className="w-full p-3 border rounded-lg border-teal-200" rows="3"></textarea>
        </div>
        <div className="bg-teal-50 p-4 rounded-xl flex justify-between items-center">
          <span className="font-bold">Total Price:</span>
          <span className="text-2xl font-bold text-teal-600">${meal.price * quantity}</span>
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition">Confirm Order</button>
      </form>
    </div>
  );
};

export default OrderPage;