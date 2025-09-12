import { useState, useEffect } from "react";
import AdminService from "../Service/AdminService";
import UserService from "../Service/UserService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import ManageCategory from "../Componants/ManageCategory";
import ManageProducts from "../Componants/ManageProducts";
import UsersOrder from "./UsersOrder";
import ViewUsers from "../Componants/ViewUsers";

function AdminDashBoard() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fake order count & history (replace with API later)
  const [orderCount, setOrderCount] = useState(15);

  useEffect(() => {
    AdminService.viweProduct()
      .then((result) => setProductCount(result.data.length))
      .catch(console.log);

    AdminService.showCategories()
      .then((result) => setCategoryCount(result.data.length))
      .catch(console.log);

    UserService.viewUsers()
      .then((result) => setUserCount(result.data.length))
      .catch(console.log);
  }, []);

  const adminName = "Admin";

  const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

  const pieData = [
    { name: "Orders", value: orderCount },
    { name: "Users", value: userCount },
    { name: "Products", value: productCount },
    { name: "Categories", value: categoryCount },
  ];

  // Fake data for bar chart (Orders vs Products over months)
  const barData = [
    { month: "Jan", Orders: 10, Products: 5 },
    { month: "Feb", Orders: 15, Products: 8 },
    { month: "Mar", Orders: 20, Products: 12 },
    { month: "Apr", Orders: 25, Products: 18 },
    { month: "May", Orders: 30, Products: 20 },
  ];

 const renderContent = () => {
  switch (activePage) {
    case "manageCategory":
      return <ManageCategory />;
    case "manageProducts":
      return <ManageProducts />;
    case "usersOrder":
      return <UsersOrder />;
    case "viewUsers":
      return <ViewUsers />;
    default:
      return (
        <div className="container-fluid">
          {/* Cards */}
          <div className="row g-4 mb-4">
            {[
              {
                icon: "bi-list-check text-primary",
                title: "Total Categories",
                value: categoryCount,
              },
              {
                icon: "bi-box-seam text-success",
                title: "Total Products",
                value: productCount,
              },
              {
                icon: "bi-cart-check text-warning",
                title: "Users Orders",
                value: orderCount,
              },
              {
                icon: "bi-people-fill text-danger",
                title: "Total Users",
                value: userCount,
              },
            ].map((card, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div
                  className={`card p-4 text-center shadow-lg border-0 rounded-4 ${
                    darkMode ? "bg-dark text-light" : "bg-white text-dark"
                  }`}
                >
                  <i className={`bi ${card.icon} fs-1 mb-2`}></i>
                  <h6 className="fw-semibold">{card.title}</h6>
                  <p className="fs-4 fw-bold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Statistics Card */}
          <div
            className={`card shadow-lg border-0 rounded-4 p-3 ${
              darkMode ? "bg-dark text-light" : "bg-white text-dark"
            }`}
          >
            <h5 className="fw-bold mb-3">Statistics Overview</h5>

            <div className="row">
              {/* Pie Chart */}
              <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="col-12 col-lg-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Orders" fill="#0d6efd" />
                    <Bar dataKey="Products" fill="#198754" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
  }
};


  return (
    <div
      className={`d-flex vh-100 flex-column ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`navbar shadow-sm px-3 d-flex justify-content-between ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
      >
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary d-lg-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
          <span className="navbar-brand fw-bold fs-4 m-0">
            <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
          </span>
        </div>
         <div className="position-absolute start-50 translate-middle-x">
      <span className="fw-semibold fs-5">Welcome, {adminName} 👋</span>
    </div>
      </nav>

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`p-3 shadow-sm d-flex flex-column justify-content-between ${
            darkMode ? "bg-secondary text-light" : "bg-white text-dark"
          } ${sidebarOpen ? "d-block" : "d-none d-lg-block"}`}
          style={{ width: "250px" }}
        >
          <ul className="list-group list-group-flush">
            {[
              { key: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
              {
                key: "manageCategory",
                label: "Manage Categories",
                icon: "bi-list-check",
              },
              {
                key: "manageProducts",
                label: "Manage Products",
                icon: "bi-box-seam",
              },
              { key: "usersOrder", label: "Users Orders", icon: "bi-cart-check" },
              { key: "viewUsers", label: "View Users", icon: "bi-people-fill" },
            ].map((item) => (
              <li
                key={item.key}
                className={`list-group-item border-0 d-flex align-items-center gap-2 ${
                  activePage === item.key
                    ? darkMode
                      ? "active bg-dark text-light"
                      : "active fw-bold"
                    : darkMode
                    ? "bg-secondary text-light"
                    : ""
                }`}
                onClick={() => setActivePage(item.key)}
                style={{ cursor: "pointer" }}
              >
                <i className={`bi ${item.icon}`}></i> {item.label}
              </li>
            ))}
          </ul>

          {/* Bottom Controls */}
          <div className="d-flex flex-column gap-2 mt-3">
            <button
              className={`btn w-100 ${
                darkMode ? "btn-outline-light" : "btn-outline-dark"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <>
                  <i className="bi bi-sun-fill me-2 text-warning"></i> Light Mode
                </>
              ) : (
                <>
                  <i className="bi bi-moon-fill me-2"></i> Dark Mode
                </>
              )}
            </button>
            <button
              className="btn btn-danger w-100"
              onClick={() => (window.location = "/")}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow-1 p-4 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
