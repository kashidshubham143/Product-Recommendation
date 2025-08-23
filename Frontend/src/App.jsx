import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Componants/Homepage';
import LoginPage from "./Componants/Login";
import SignupPage from "./Componants/SignupPage";
import AdminDashboard from './Componants/AdminDashBord';
import UserDashboard from './Componants/UserDashboard';
import AddProductPage from './Componants/AddProductPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/AdminDashBord" element={<AdminDashboard />}/>
          <Route path="/UserDashBord" element={<UserDashboard />} />
          <Route path="/AddProductPage" element={<AddProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
