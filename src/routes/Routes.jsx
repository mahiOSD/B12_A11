import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'




//import DashboardLayout from '../layouts/DashboardLayout'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

])