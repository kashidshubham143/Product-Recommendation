import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../Service/AdminService";
import UserService from '../Service/UserService';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Imported sub-pages/components
import ManageCategory from "../Componants/ManageCategory";
import ManageProducts from "../Componants/ManageProducts";
import AddProductPage from "../Componants/AddProductPage";
// import ViewUsers from "../Componants/ViewUsers";

function AdminDashboard() {

    const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount,setCategoryCount] = useState(0);
  useEffect(() => {
    // Fetch Products Data From DB
    AdminService.viweProduct()
      .then((result) => {
        setProductCount(result.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

      //For Fetch Categories From DB
      AdminService.showCategories().then((result)=>{
        setCategoryCount(result.data.length)
      }).catch((err)=>{
        console.log(err);
      });

      // Fetch Users From DB
      UserService.viewUsers().then((result)=>{
        // console.log(result);
        setUserCount(result.data.length);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard"); // controls which page is shown
  const adminName = "Admin";

  const handleLogout = () => {
    navigate("/AdminLogin");
  };

  // Back button handler
  const handleBack = () => {
    setActivePage("dashboard");
  };

  // Render the selected content
  const renderContent = () => {
    switch (activePage) {
      case "manageCategory":
        return <ManageCategory />;
      case "manageProducts":
        return <ManageProducts />;
      case "addProduct":
        return <AddProductPage />;
      case "viewUsers":
        return <ViewUsers />;
      default:
        return (
          <div className="row g-4">
            {/* Manage Category */}
            <div className="col-md-3">
              <div
                className="card shadow-lg glass-card text-center p-4 clickable"
                onClick={() => setActivePage("manageCategory")}
              >
                <i className="bi bi-list-check fs-1 text-primary mb-2"></i>
                <h5>Total Categories</h5>
                <p className="fs-4 fw-bold">{categoryCount}</p>
              </div>
            </div>

            {/* Manage Products */}
            <div className="col-md-3">
              <div
                className="card shadow-lg glass-card text-center p-4 clickable"
                onClick={() => setActivePage("manageProducts")}
              >
                <i className="bi bi-box-seam fs-1 text-success mb-2"></i>
                <h5>Total Products</h5>
                <p className="fs-4 fw-bold">{productCount}</p>
              </div>
            </div>

            {/* Add Product */}
            <div className="col-md-3">
              <div
                className="card shadow-lg glass-card text-center p-4 clickable"
                onClick={() => setActivePage("addProduct")}
              >
                <i className="bi bi-plus-circle fs-1 text-warning mb-2"></i>
                <h5>Add Product</h5>
                <p className="fs-4 fw-bold">+</p>
              </div>
            </div>

            {/* View Users */}
            <div className="col-md-3">
              <div
                className="card shadow-lg glass-card text-center p-4 clickable"
                onClick={() => setActivePage("viewUsers")}
              >
                <i className="bi bi-people-fill fs-1 text-danger mb-2"></i>
                <h5>Total Users</h5>
                <p className="fs-4 fw-bold">{userCount}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-light shadow-sm px-3 d-flex justify-content-between">
        <span className="text-dark navbar-brand fw-bold fs-4">
          <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
        </span>
        <div className=" fw-semibold">Welcome, {adminName} 👋</div>
        <button className="btn btn-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </nav>

      {/* Back Button - only show when not on dashboard */}
      {activePage !== "dashboard" && (
        <div className="fixed-back-btn">
          <BackButton onBack={handleBack} />
        </div>
      )}

      {/* Main Content */}
      <div className="content p-4">{renderContent()}</div>

      {/* Styles */}
      <style>{`
        body {
          background: linear-gradient(to right, #e3f2fd, #e1f5fe);
        }
        .glass-card {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 6px 20px rgba(0,0,0,0.15);
        }
        .clickable {
          cursor: pointer;
        }
        .fixed-back-btn {
          position: fixed;
          top: 70px;   /* just below navbar */
          left: 15px;
          z-index: 1050;
        }
      `}</style>
    </>
  );
}

// Back button component
function BackButton({ onBack }) {
  return (
    <button className="btn btn-outline-primary back-btn" onClick={onBack}>
      <i className="bi bi-arrow-left"></i> Back
    </button>
  );
}

export default AdminDashboard;
