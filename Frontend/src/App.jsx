import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componants/Homepage";
import LoginPage from "./Componants/Login";
import SignupPage from "./Componants/SignupPage";
import AdminDashBoard from "./Componants/AdminDashBord";

// Users
import UserDashBoard from "./Componants/UserDashboard";
import AddProductPage from "./Componants/AddProductPage";
import Clothes from "./Componants/Clothes";
import Electronics from "./Componants/Electronics";
import Shoes from "./Componants/Shoes";
import UserContext from "./context/UserContext";

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
        <Route path="/AdminDashBord" element={<AdminDashBoard />} />
        <Route path="/UserDashBoard" element={<UserDashBoard />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/Electronics" element={<Electronics />} />
        <Route path="/Shoes" element={<Shoes />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/" element={<Home token={token} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
