import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componants/Homepage";
import LoginPage from "./Componants/Login";
import SignupPage from "./Componants/SignupPage";
import AdminDashBoard from "./Componants/AdminDashBord";

// Users
import UserDashBoard from "./Componants/UserDashboard";
import AddProductPage from "./Componants/AddProductPage";
import UserContext from "./context/UserContext";
import Wishlist from "./Componants/WishList";
import ProfilePage from "./Componants/ProfilePage1";
import PageWrapper from "./Componants/PageWrapper";
import "./App.css";
import CheckoutPage from "./Componants/CheckoutPage";
import OrderPage from './Componants/OrderPage';
import ThemeProvider from './context/ThemeContext.jsx'
import UsersOrder from "./Componants/UsersOrder.jsx";

function App() {
  const { setUser } = useContext(UserContext);

  const token = localStorage.getItem("jwtToken");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setUser({
        userId: user.id,
        userName: user.name,
      });
      
    }
  }, []);


  return (
    <BrowserRouter>

    <ThemeProvider>
      <Routes>
         
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home token={token} />
            </PageWrapper>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/AdminDashBord" element={<AdminDashBoard />} />
        <Route path="/UserDashBoard" element={<UserDashBoard />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/wishList" element={<Wishlist />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkOut" element={<CheckoutPage/>} /> 
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/UsersOrder" element={<UsersOrder />} />
      </Routes>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
