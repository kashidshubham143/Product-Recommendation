// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componants/Homepage";
import LoginPage from "./Componants/Login";
import SignupPage from "./Componants/SignupPage";
import AdminDashBoard from "./Componants/AdminDashBord";

//Users
import UserDashboard from "./Componants/UserDashboard";
import AddProductPage from "./Componants/AddProductPage";
import Clothes from "./Componants/Clothes";
import Electronics from "./Componants/Electronics";
import Shoes from "./Componants/Shoes";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/AdminDashBord" element={<AdminDashBoard />} />
            <Route path="/UserDashBord" element={<UserDashboard />} />
            <Route path="/AddProductPage" element={<AddProductPage />} />
            <Route path="/Electronics" element={<Electronics />} />
            <Route path="/Shoes" element={<Shoes />} />
            <Route path="/Clothes" element={<Clothes />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
