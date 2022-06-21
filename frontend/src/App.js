import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import ProductDetails from "./pages/Product/ProductDetails";
import Products from "./pages/Product/Products";
import Search from "./pages/Product/Search";
import LoginSignUp from "./pages/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./pages/User/Profile";
import UpdateProfile from "./pages/User/UpdateProfile";
import UpdatePassword from "./pages/User/UpdatePassword";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import Payment from "./pages/Cart/Payment";
import OrderSuccess from "./pages/Cart/OrderSuccess";
import MyOrders from "./pages/Order/MyOrders";
import OrderDetails from "./pages/Order/OrderDetails";
import Dashboard from "./pages/Admin/Dashboard";
import ProductList from "./pages/Admin/ProductList";
import NewProduct from "./pages/Admin/NewProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import OrderList from "./pages/Admin/OrderList";
import ProcessOrder from "./pages/Admin/ProcessOrder";
import UsersList from "./pages/Admin/UsersList";
import UpdateUser from "./pages/Admin/UpdateUser";
import ProductReviews from "./pages/Admin/ProductReviews";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import NotFound from "./components/Not Found/NotFound";
import { useSelector } from "react-redux";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />

      <Route path="/search" element={<Search />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/about" element={<About />} />

      {isAuthenticated ? (
        <Route path="/account" element={<Profile />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/me/update" element={<UpdateProfile />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/password/update" element={<UpdatePassword />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      <Route path="/password/forgot" element={<ForgotPassword />} />

      <Route path="/password/reset/:token" element={<ResetPassword />} />

      <Route path="/login" element={<LoginSignUp />} />

      <Route path="/cart" element={<Cart />} />

      {isAuthenticated ? (
        <Route path="/shipping" element={<Shipping />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}
      {isAuthenticated ? (
        <Route path="/process/payment" element={<Payment />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/success" element={<OrderSuccess />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/orders" element={<MyOrders />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/order/confirm" element={<ConfirmOrder />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated ? (
        <Route path="/order/:id" element={<OrderDetails />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/dashboard" element={<Dashboard />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/products" element={<ProductList />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/product" element={<NewProduct />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/orders" element={<OrderList />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/users" element={<UsersList />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/user/:id" element={<UpdateUser />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      {isAuthenticated && user.role === "admin" ? (
        <Route path="/admin/reviews" element={<ProductReviews />} />
      ) : (
        <Route path="/login" element={<LoginSignUp />} />
      )}

      <Route
        element={
          window.location.pathname === "/process/payment" ? null : NotFound
        }
      />
    </Routes>
  );
}

export default App;
