import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const MainLayout = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <div>
      <Navbar />

      {loading && <LoadingSpinner />}

      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
