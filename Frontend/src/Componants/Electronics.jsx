import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Electronics() {
  const products = {
    mobiles: [
      { id: 1, name: "iPhone 14", price: 79999, image: "data:image/webp;base64,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" },
      { id: 2, name: "Samsung Galaxy S23", price: 69999, image: "/public/images/samsung.webp" },
      { id: 3, name: "OnePlus 11", price: 59999, image: "/public/images/Dell.webp"},
      { id: 4, name: "Vivo V27", price: 34999, image: "/public/images/samsung.webp" },
      { id: 5, name: "Oppo Reno 8", price: 29999, image: "https://via.placeholder.com/250x250.png?text=Oppo+Reno+8" },
    ],
    laptops: [
      { id: 6, name: "MacBook Air M2", price: 109999, image: "https://via.placeholder.com/250x250.png?text=MacBook+Air+M2" },
      { id: 7, name: "Dell Inspiron 15", price: 55499, image: "/public/images/Dell.webp" },
      { id: 8, name: "HP Pavilion", price: 62999, image: "https://via.placeholder.com/250x250.png?text=HP+Pavilion" },
      { id: 9, name: "Lenovo IdeaPad", price: 48999, image: "https://via.placeholder.com/250x250.png?text=Lenovo+IdeaPad" },
      { id: 10, name: "Asus ROG", price: 89999, image: "https://via.placeholder.com/250x250.png?text=Asus+ROG" },
    ],
    accessories: [
      { id: 11, name: "Sony Headphones", price: 1299, image: "https://via.placeholder.com/250x250.png?text=Headphones" },
      { id: 12, name: "Apple AirPods", price: 19999, image: "https://via.placeholder.com/250x250.png?text=AirPods" },
      { id: 13, name: "Smart Watch", price: 2999, image: "https://via.placeholder.com/250x250.png?text=Smart+Watch" },
      { id: 14, name: "Bluetooth Speaker", price: 1799, image: "https://via.placeholder.com/250x250.png?text=Speaker" },
      { id: 15, name: "Tablet", price: 22499, image: "https://via.placeholder.com/250x250.png?text=Tablet" },
    ],
    cameras: [
      { id: 16, name: "Canon DSLR", price: 45999, image: "https://via.placeholder.com/250x250.png?text=Canon+DSLR" },
      { id: 17, name: "Nikon DSLR", price: 42999, image: "https://via.placeholder.com/250x250.png?text=Nikon+DSLR" },
      { id: 18, name: "Sony Mirrorless", price: 59999, image: "https://via.placeholder.com/250x250.png?text=Sony+Mirrorless" },
      { id: 19, name: "GoPro Hero", price: 29999, image: "https://via.placeholder.com/250x250.png?text=GoPro+Hero" },
      { id: 20, name: "FujiFilm Instax", price: 9999, image: "https://via.placeholder.com/250x250.png?text=FujiFilm+Instax" },
    ],
    tvs: [
      { id: 21, name: "Samsung Smart TV", price: 44999, image: "https://via.placeholder.com/250x250.png?text=Samsung+TV" },
      { id: 22, name: "LG OLED TV", price: 79999, image: "https://via.placeholder.com/250x250.png?text=LG+OLED" },
      { id: 23, name: "Sony Bravia", price: 69999, image: "https://via.placeholder.com/250x250.png?text=Sony+Bravia" },
      { id: 24, name: "Mi Smart TV", price: 29999, image: "https://via.placeholder.com/250x250.png?text=Mi+Smart+TV" },
      { id: 25, name: "OnePlus TV", price: 39999, image: "https://via.placeholder.com/250x250.png?text=OnePlus+TV" },
    ],
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categoriesToShow = selectedCategories.length > 0 ? selectedCategories : Object.keys(products);

  const sortProducts = (items) => {
    if (sortOrder === "lowToHigh") return [...items].sort((a, b) => a.price - b.price);
    if (sortOrder === "highToLow") return [...items].sort((a, b) => b.price - a.price);
    return items;
  };

  // 🔍 Search filter
  const filterBySearch = (items) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      {/* Navbar like Meesho */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-primary">
            <span className="text-dark">Shop Now</span>
          </Link>

          {/* 🔍 Search bar in navbar */}
          <form className="d-flex mx-auto w-50" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search Electronics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar Filters */}
          <aside className="col-md-3 col-lg-2 mb-4">
            <div className="p-3 bg-white shadow-sm rounded-3">
              <h5 className="fw-bold mb-3">Filters</h5>

              <h6 className="fw-semibold">Category</h6>
              {Object.keys(products).map((category) => (
                <div key={category} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="form-check-label text-capitalize">
                    {category}
                  </label>
                </div>
              ))}

              <hr />
              <h6 className="fw-semibold">Sort by Price</h6>
              <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="none">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </aside>

          {/* Products */}
          <main className="col-md-9 col-lg-10">
            {categoriesToShow.map((category) => {
              const filtered = filterBySearch(sortProducts(products[category]));
              if (filtered.length === 0) return null;
              return (
                <div key={category} className="mb-5">
                  <h5 className="fw-bold text-capitalize mb-3">{category}</h5>
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {filtered.map((product) => (
                      <div className="col" key={product.id}>
                        <div className="card h-100 shadow-sm border-0">
                          <img src={product.image} className="card-img-top p-3" alt={product.name} />
                          <div className="card-body text-center">
                            <h6 className="card-title">{product.name}</h6>
                            <p className="fw-bold text-success">₹{product.price.toLocaleString()}</p>
                            <button className="btn btn-outline-primary btn-sm w-100 rounded-pill">
                              <i className="bi bi-cart-plus me-2"></i> Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* If no results */}
            {categoriesToShow.every((cat) => filterBySearch(products[cat]).length === 0) && (
              <p className="text-center fw-bold">No products found</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Electronics;
