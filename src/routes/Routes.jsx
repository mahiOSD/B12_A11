import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/Meals/MealDetails";
import OrderPage from "../pages/Order/OrderPage";
import Profile from "../pages/Dashboard/Profile/Profile";

import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import Favorites from "../pages/Dashboard/User/Favorites";

import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";

import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "../pages/Dashboard/Admin/AdminRoute";
import ChefRoute from "../pages/Dashboard/Chef/ChefRoute";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage";

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
      { path: "", element: <DashboardRedirect /> },
      { path: "user-home", element: <UserDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "favorites", element: <Favorites /> },

      {
        path: "create-meal",
        element: <ChefRoute><CreateMeal /></ChefRoute>,
      },
      {
        path: "my-meals",
        element: <ChefRoute><MyMeals /></ChefRoute>,
      },
      {
        path: "order-requests",
        element: <ChefRoute><OrderRequests /></ChefRoute>,
      },

      {
        path: "admin",
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
      },

      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },

  
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
