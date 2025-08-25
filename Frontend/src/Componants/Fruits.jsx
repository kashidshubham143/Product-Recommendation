import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Fruits() {
  const fruits = [
    { id: 1, name: "Apple", price: "₹120/kg", image: "https://via.placeholder.com/200?text=Apple", category: "Fresh" },
    { id: 2, name: "Banana", price: "₹60/dozen", image: "https://via.placeholder.com/200?text=Banana", category: "Fresh" },
    { id: 3, name: "Grapes", price: "₹90/kg", image: "https://via.placeholder.com/200?text=Grapes", category: "Fresh" },
    { id: 4, name: "Mango", price: "₹150/kg", image: "https://via.placeholder.com/200?text=Mango", category: "Seasonal" },
    { id: 5, name: "Orange", price: "₹100/kg", image: "https://via.placeholder.com/200?text=Orange", category: "Seasonal" },
    { id: 6, name: "Dry Dates", price: "₹250/kg", image: "https://via.placeholder.com/200?text=Dry+Dates", category: "Dry Fruits" },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Apply category filter + search
  const filteredFruits = fruits.filter((item) => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-success">
            <span className="text-dark">Fruit Shop</span>
          </Link>

          <form
            className="d-flex mx-auto w-50"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search Fruits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-success rounded-pill ms-2 px-4" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-dark me-3 rounded-pill px-3">
              <i className="bi bi-person me-2"></i> Profile
            </Link>
            <Link to="/cart" className="btn btn-outline-dark rounded-pill px-3">
              <i className="bi bi-cart-fill me-2"></i> Cart
            </Link>
          </div>
        </div>
      </nav>

      {/* ✅ Main Container */}
      <div className="container my-3">

        {/* 🏷️ Category Buttons */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {["All", "Fresh", "Seasonal", "Dry Fruits"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 ${
                filter === cat ? "btn-success text-white" : "border"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🍎 Fruits Grid */}
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {filteredFruits.map((item) => (
            <div className="col" key={item.id}>
              <div className="card shadow-sm h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="fw-bold mb-1">{item.price}</p>
                  <button className="btn btn-sm btn-success w-100 rounded-pill">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredFruits.length === 0 && <p>No fruits found</p>}
        </div>
      </div>
    </>
  );
}

export default Fruits;
