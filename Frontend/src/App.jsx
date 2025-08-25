// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componants/Homepage";
import LoginPage from "./Componants/Login";
import SignupPage from "./Componants/SignupPage";
import AdminDashboard from "./Componants/AdminDashBord";

import AdminService from "./Service/AdminService";
//Users
import UserDashboard from "./Componants/UserDashboard";
import AddProductPage from "./Componants/AddProductPage";
import Clothes from "./Componants/Clothes";
import Electronics from "./Componants/Electronics";
// import UserProfile from "./Componants/UserProfile";
import Shoes from "./Componants/Shoes";

function App() {
  // const [cotegories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [data, setData] = useState([]);



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/AdminDashBord" element={<AdminDashboard />} />
          <Route path="/UserDashBord" element={<UserDashboard />} />
          <Route path="/AddProductPage" element={<AddProductPage />} />

          {/* <Route path="/UserProfile" element={<UserProfile/>} /> */}
          <Route path="/Electronics" element={<Electronics />} />
          <Route path="/Shoes" element={<Shoes />} />
          <Route path="/Clothes" element={<Clothes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
