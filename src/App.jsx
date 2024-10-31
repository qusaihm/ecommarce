import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/home/components/Home";
import Categories from "./pages/categories/components/Categories";
import Login from "./pages/login/components/Login";
import Products from "./pages/products/components/Products";
import Details from "./pages/products/Details";
import Register from "./pages/register/components/Register";
import NotFound from "./components/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import UnProtectedRoutes from "./auth/UnProtectedRoutes";
import UserContextProvider from "./context/User";
import Cart from "./pages/cart/components/Cart";
 
 
import ForgetPassword from "./pages/login/components/ForgetPassword";
import ResetPassword from "./pages/login/components/ResetPassword";
import Order from "./pages/order/components/Oreder";
import Profile from "./pages/profile/components/Profile";
import MyOrders from "./pages/order/components/MyOrder";
import CartContextProvider from "./context/CartContext";
import SubCategories from './pages/categories/components/SubCategories';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },

      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },

      {
        path: "user/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: "myorder",
            element: <MyOrders />,
          },
        ],
      },

      {
        path: "/details/:id",
        element: <Details />,
      },

      {
        path: "/categories/:id",
        element: <SubCategories />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <CartContextProvider>
              <Cart />
            </CartContextProvider>
          </ProtectedRoutes>
        ),
      },

      {
        path: "/order",
        element: (
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />;
        </CartContextProvider>
      </UserContextProvider>

      <ToastContainer />
    </>
  );
}
