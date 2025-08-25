import React, { useState } from "react";
import { Link } from "react-router-dom";  // ✅ Fix import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Clothes() {
  const clothes = [
    { id: 1, name: "Men's T-Shirt", price: "₹499", image: "https://via.placeholder.com/200", category: "Men" },
    { id: 2, name: "Women's Kurti", price: "₹699", image: "https://via.placeholder.com/200", category: "Women" },
    { id: 3, name: "Jeans", price: "₹999", image: "https://via.placeholder.com/200", category: "Men" },
    { id: 4, name: "Saree", price: "₹1,299", image: "https://via.placeholder.com/200", category: "Women" },
    { id: 5, name: "Kids Shirt", price: "₹399", image: "https://via.placeholder.com/200", category: "Kids" },
    { id: 6, name: "Cap", price: "₹199", image: "https://via.placeholder.com/200", category: "Accessories" },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Apply both category filter & search filter
  const filteredClothes = clothes.filter((item) => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-primary">
            <span className="text-dark">Shop Now</span>
          </Link>

          <form
            className="d-flex mx-auto w-50"
            onSubmit={(e) => e.preventDefault()} // prevent refresh
          >
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search Clothes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)} // ✅ live search
            />
            <button className="btn btn-primary rounded-pill ms-2 px-4" type="submit">
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
          {["All", "Men", "Women", "Kids", "Accessories"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 ${
                filter === cat ? "btn-dark text-white" : "border"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 👕 Products Grid */}
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {filteredClothes.map((item) => (
            <div className="col" key={item.id}>
              <div className="card shadow-sm h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body p-2">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="fw-bold mb-1">{item.price}</p>
                  <button className="btn btn-sm btn-dark w-100 rounded-pill">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredClothes.length === 0 && <p>No products found</p>}
        </div>
      </div>
    </>
  );
}

export default Clothes;
