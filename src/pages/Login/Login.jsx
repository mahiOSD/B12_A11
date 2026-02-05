import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Login = () => {
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-md p-6 bg-gray-100 rounded w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full p-2 border rounded"
          />

          <button className="bg-lime-500 w-full py-2 text-white rounded">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Don't have account?{" "}
          <Link to="/signup" className="text-lime-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
