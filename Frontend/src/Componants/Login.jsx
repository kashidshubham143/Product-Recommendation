import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import AdminService from "../Service/AdminService";

function LoginPage() {
  const [massege, setMassege] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role === "admin") {
      // console.log(formData);
      AdminService.CheckAdmin(formData)
        .then((result) => {
          if (result.data === "okey") navigate("/AdminDashBord");
          else setMassege(result.data);
        })
        .catch((err) => {
          // console.log(err);
          setMassege(err.data);
        });
    } else {
      UserService.checkUser(formData)
        .then((result) => {
          // console.log(result);
          if (result.data === "Invalid Crediatials") {
            setMassege(result.data);``
          } else {
            //  console.log(result.data[0].id);
            navigate("/UserDashBord",{state:{id:result.data[0].id}}); // Navigate User Dashboard
          }
        })
        .catch((err) => {
          // console.log(err);
          setMassege(err.data);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>
        {/* Role */}
        <div className="mb-3">
          <label className="form-label text-success fw-bold fs-4 border-primary border-2">
            Login As
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Username for Admin / Email for User */}
        {formData.role === "admin" ? (
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter username "
              required
            />
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Email "
              required
            />
          </div>
        )}

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        {/* Error message */}
        {massege && <div className="text-danger mt-2">{massege}</div>}

        {/* Conditional UI */}
        {formData.role === "user" ? (
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-decoration-none fw-bold text-primary"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-success mt-3 text-center">
            Enter valid details...
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
