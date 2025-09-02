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
import ProfilePage from "./Componants/ProfilePage";

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
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/AdminDashBord" element={<AdminDashBoard />} />
        <Route path="/UserDashBoard" element={<UserDashBoard />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/wishList" element={<Wishlist />}/>
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
