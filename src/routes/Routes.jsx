import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/Meals/MealDetails";
import OrderPage from "../pages/Order/OrderPage";

import Profile from "../pages/Dashboard/Profile/Profile";


import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import Favorites from "../pages/Dashboard/User/Favorites";


import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";

import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";

import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/meals", element: <Meals /> },
      { path: "/meal/:id", element: <PrivateRoute><MealDetails /></PrivateRoute> },
      { path: "/order/:id", element: <PrivateRoute><OrderPage /></PrivateRoute> },
      { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
    
      { path: "", element: <UserDashboard /> },

     
      { path: "profile", element: <Profile /> },

     
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "favorites", element: <Favorites /> },

      
      { path: "create-meal", element: <CreateMeal /> },
      { path: "my-meals", element: <MyMeals /> },
      { path: "order-requests", element: <OrderRequests /> },

     
      { path: "admin", element: <AdminDashboard /> },
    ],
  },


  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
