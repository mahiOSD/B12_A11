import { useForm } from "react-hook-form";
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

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    const { name, email, image, address, password, confirmPassword } = data;

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            {...register("image", { required: "Image URL is required" })}
            placeholder="Profile Image URL"
            className="w-full p-2 border rounded"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}

          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}

          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <input
            type="password"
            {...register("confirmPassword", { required: "Confirm password is required", validate: value => value === password || "Passwords do not match" })}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

          <button className="bg-lime-500 w-full py-2 text-white rounded">
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Already have account? <Link to="/login" className="text-lime-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
