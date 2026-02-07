import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const address = form.address.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
  const result = await createUser(email, password);

  await updateUserProfile(name, image);

  const userInfo = {
    name,
    email,
    image,
    address,
    role: "user",
    status: "active",
  };

 
  await axios.post("http://localhost:5000/users", userInfo);

  toast.success("Signup Successful");
  navigate(from, { replace: true });
} catch (err) {
  toast.error(err.message);
}

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-md p-6 bg-gray-100 rounded w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            name="image"
            required
            placeholder="Profile Image URL"
            className="w-full p-2 border rounded"
          />

          <input
            name="address"
            required
            placeholder="Address"
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full p-2 border rounded"
          />

          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
          />

          <button className="bg-lime-500 w-full py-2 text-white rounded">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Already have account?{" "}
          <Link to="/login" className="text-lime-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
