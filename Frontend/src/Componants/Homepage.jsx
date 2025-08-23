import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for navbar & modal
import "bootstrap-icons/font/bootstrap-icons.css";

function HomePage() {
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(selected);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container-fluid px-5">
          {/* Logo */}
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            <i className="bi bi-box-seam me-2"></i> ProductManagement
          </Link>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fw-bold">
              {/* Products */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="#products">
                  <i className="bi bi-bag-fill me-1"></i> Products
                </Link>
              </li>

              {/* Categories */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="#categories">
                  <i className="bi bi-grid-fill me-1"></i> Categories
                </Link>
              </li>

              {/* Our Customers */}
              <li className="nav-item">
                <a className="nav-link text-white" href="#customers">
                  <i className="bi bi-people-fill me-1"></i> Our Customers
                </a>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">
                  <i className="bi bi-telephone me-1"></i> Contact
                </a>
              </li>

              {/* Login */}
              <li className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/login" className="nav-link">
                  <i className="bi bi-person-circle fs-5"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-text-box">
          <h1 className="fw-bold display-4">Welcome to Product Management</h1>
          <p className="lead">
            Discover, shop, and manage your favorite products easily.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg mt-3">
            <i className="bi bi-cart-fill me-2"></i> Start Shopping
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div
        className="container text-center my-5 text-purple-600"
        id="categories"
      >
        <h2 className="section-title mb-4">Shop by Category</h2>
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {[
            { icon: "📱", title: "Electronics" },
            { icon: "👗", title: "Clothes" },
            { icon: "🛒", title: "Grocery" },
            { icon: "💊", title: "Medicine" },
          ].map((cat, i) => (
            <div className="col" key={i}>
              <div className="card p-4 bg-light shadow-sm border-0 h-100 hover-card">
                <div className="category-icon fs-1">{cat.icon}</div>
                <div className="fw-bold mt-2 fs-4">{cat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <section id="products" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            🔥 Featured Products
          </h2>

          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 hover-card h-100">
                <img
                  src="https://assets.winni.in/product/primary/2023/3/83221.jpeg?dpr=1&w=500"
                  className="card-img-top"
                  alt="Product 1"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Product 1</h5>
                  <p className="card-text text-muted">
                    Best quality at low price
                  </p>
                  <button className="btn btn-success btn-sm w-100">
                    <i className="bi bi-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 hover-card h-100">
                <img
                  src="https://jewelemarket.com/cdn/shop/products/11052859GL.jpg?v=1738995226"
                  className="card-img-top"
                  alt="Product 2"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Product 2</h5>
                  <p className="card-text text-muted">
                    Best quality at low price
                  </p>
                  <button className="btn btn-success btn-sm w-100">
                    <i className="bi bi-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 hover-card h-100">
                <img
                  src="https://tiimg.tistatic.com/fp/1/007/788/commonally-cultivated-farm-fresh-red-tomato-vegetables-973.jpg"
                  className="card-img-top"
                  alt="Product 3"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Product 3</h5>
                  <p className="card-text text-muted">
                    Best quality at low price
                  </p>
                  <button className="btn btn-success btn-sm w-100">
                    <i className="bi bi-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 hover-card h-100">
                <img
                  src="https://assets.winni.in/product/primary/2023/3/83221.jpeg?dpr=1&w=500"
                  className="card-img-top"
                  alt="Product 4"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Product 4</h5>
                  <p className="card-text text-muted">
                    Best quality at low price
                  </p>
                  <button className="btn btn-success btn-sm w-100">
                    <i className="bi bi-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <div className="bg-light py-5" id="customers">
        <div className="container text-center">
          <h2 className="section-title mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="bi bi-lightning-charge fs-1 text-warning"></i>
              <h5 className="mt-3">Instant Delivery</h5>
              <p className="text-muted">
                Get your orders delivered within minutes.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-currency-rupee fs-1 text-success"></i>
              <h5 className="mt-3">Best Prices</h5>
              <p className="text-muted">
                Affordable pricing with great offers.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-stars fs-1 text-primary"></i>
              <h5 className="mt-3">Top Quality</h5>
              <p className="text-muted">
                We provide only trusted & genuine products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container my-5">
        <h2 className="section-title text-center mb-4">
          What Our Customers Say
        </h2>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {[
              {
                name: "Ravi Kumar",
                text: "Amazing products and fast delivery!",
              },
              {
                name: "Priya Sharma",
                text: "User-friendly and great discounts.",
              },
              {
                name: "Aman Verma",
                text: "Loved the experience, will shop again.",
              },
            ].map((review, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={i}
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="bi bi-chat-quote fs-1 text-info"></i>
                  <p className="lead text-center mt-3">{review.text}</p>
                  <h6 className="fw-bold">- {review.name}</h6>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="container my-5 bg-dark">
        <h2 className="section-title text-center mb-4">📞 Get in Touch</h2>
        <p className="lead text-muted text-center mb-5">
          Have questions? We'd love to hear from you. Reach us through any of
          the ways below.
        </p>

        <div className="row g-4 text-center">
          {/* Address */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100 border-0 hover-card">
              <i className="bi bi-geo-alt fs-2 text-danger"></i>
              <h5 className="mt-3">Our Office</h5>
              <p>Bangalore, Karnataka, India</p>
            </div>
          </div>

          {/* Email */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100 border-0 hover-card">
              <i className="bi bi-envelope-at fs-2 text-primary"></i>
              <h5 className="mt-3">Email Us</h5>
              <p>
                <a
                  href="mailto:kashids961@gmail.com"
                  className="text-decoration-none"
                >
                  kashids961@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100 border-0 hover-card">
              <i className="bi bi-telephone fs-2 text-success"></i>
              <h5 className="mt-3">Call Us</h5>
              <p>
                <a href="tel:+919890157552" className="text-decoration-none">
                  +91 9890157552
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mt-5">
          <h5 className="mb-3">Follow Us</h5>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="mx-2 text-primary fs-4"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="mx-2 text-dark fs-4"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="mx-2 text-info fs-4"
          >
            <i className="bi bi-twitter"></i>
          </a>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card shadow-sm p-4 border-0">
              <h5 className="text-center mb-4">Send us a Message</h5>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-send-fill me-2"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="userType" className="form-label">
                  Login As
                </label>
                <select
                  className="form-select"
                  id="userType"
                  onChange={handleUserTypeChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="/AdminLogin">Admin</option>
                  <option value="/UserLogin">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center bg-dark text-white py-3">
        <p className="mb-0">© 2025 ProductManagement. All Rights Reserved.</p>
      </footer>

      {/* Styles */}
      <style>{`
          .hero-section {
            height: 600px;
            width: 100%;
            background-size: cover;
            background-position: center;
            animation: change 20s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-text-box {
            padding: 30px 50px;
            border-radius: 12px;
            color: #000;
            background: rgba(255,255,255,0.6);
          }
          @keyframes change {
            5% { background-image: url("https://images.pexels.com/photos/51958/oranges-fruit-vitamins-healthy-eating-51958.jpeg"); }
            25% { background-image: url("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"); }
            50% { background-image: url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop"); }
            100% { background-image: url("https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop"); }
          }
        .hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
          .section-title {
            font-weight: bold;
            font-size: 2rem;
            color: #0d6efd;
          }
        `}</style>
    </>
  );
}

export default HomePage;
