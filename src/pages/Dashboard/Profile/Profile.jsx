import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();

  const handleRequest = (type) => {
    axiosSecure.post("/roles", {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
    });
  };

  return (
    <div>
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>

      <button onClick={() => handleRequest("chef")}>
        Be a Chef
      </button>

      <button onClick={() => handleRequest("admin")}>
        Be Admin
      </button>
    </div>
  );
};

export default Profile;
