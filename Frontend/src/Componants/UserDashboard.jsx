import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";

import AdminService from "../Service/AdminService";
import UserService from "../Service/UserService";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserDashBoard() {

console.log("UserDashboard rendered at", new Date().toISOString());
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [searchProduct, setSearchProducts] = useState([]); //store products for searching

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // fetch User id andd Name that  Saved in Login page
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  //Check user Valid or not ??
  useEffect(() => {
    if (!user.userId) { return;} //stop re-rendering 
    let token = localStorage.getItem("jwtToken");
    if (!user.userId || !token) {
      return navigate("/login");
    } else {
      UserService.getProfile(token)
        .then((e) => {
          // console.log(e.data);
          if(e.data!==user.userName) {
            return navigate("/login");
          };
        })
        .catch((err) => {
          if(err.status==403){ localStorage.removeItem("jwtToken"); 
            return navigate("/login");
          }
          console.log(err)});
    }
  }, []);

  // Load products + categories
  useEffect(() => {
    AdminService.viweProduct()
      .then((result) => {
        setProducts(result.data);
        setSearchProducts(result.data); //add products in searchProduct
      })
      .catch((err) => console.log(err));

    AdminService.showCategories()
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  }, [refresh]); //refresh

  // Filter by category
  const categoryHandler = (id) => {
    // console.log(id);
    
    UserService.fetchProduct(id)
      .then((res) => {
        // console.log(res.data);
        setSearchProducts(res.data);
        setCurrentPage(1);
      })
      .catch((err) => console.log(err));
  };

  // Cart
  const [cartCount, setCartCount] = useState(0);
  const [cartRefresh, setCartRefresh] = useState(0);
  //This Hook For Fetch Neccesory Data From Products and Carts
  const [cartProduct, setCartProduct] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    UserService.addInCart(user.userId, product.id)
      .then(() => {
        // console.log(res);
        setCartRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetched Carts Info From DB
  useEffect(() => {
    UserService.getCartData(user.userId)
      .then((res) => {
        // console.log(res);
        setCartCount(res.data.length);
        setCartProduct(res.data);
        // setUserName(res.data[0].userName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartRefresh]);

  // In Cart Descrese Product Quantity(Count)
  let descreseQuantity = (id) => {
    // console.log(id);
    UserService.quantity(id, "minus")
      .then((e) => {
        // console.log(e.data);x
        setCartRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  let increseQuantity = (id) => {
    // console.log(id);
    UserService.quantity(id, "plus")
      .then((e) => {
        // console.log(e.data);
        setCartRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  //* Search-Bar Logic
  let searchBar = (val) => {
    // console.log(val);
    let searchVal = products.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
    setSearchProducts(searchVal);
  };

  //* Like Handler
  const [likeRefresh, setLikeRefresh] = useState(0); //every time like are update then it should reflact
  const [allLikes, setAllLikes] = useState([]);
  useEffect(() => {
    //Fetch All likes
    UserService.fetchAllLikes()
      .then((e) => {
        // console.log(e);
        const likesObject = Object.fromEntries(
          e.data.map((item) => [item.product_id, item.liked])
        );
        setAllLikes(likesObject);
      })
      .catch((err) => console.log(err));
  }, [likeRefresh]);

  const [likes, setLikes] = useState({}); // store all likes product wise
  useEffect(() => {
    //fetch this ueser likes only.
    UserService.showLike(user.userId)
      .then((e) => {
        // console.log(e);
        const likesObject = Object.fromEntries(
          e.data.map((item) => [item.product_id, item.liked])
        );
        // console.log(likesObject);
        setLikes(likesObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [likeRefresh]);

  const toggleLike = (productId) => {
    //  console.log("Likes  "+JSON.stringify(likes));
    const isLiked = !!likes[productId]; // check current state
    const msg = isLiked ? "delete" : "add";

    UserService.managelike(user.userId, productId, msg)
      .then((e) => {
        // console.log(e);
        setLikeRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  //* Track views
  const [viewedProducts, setViewedProducts] = useState(new Set()); // save  here all view products
  const [viewRefresh, setViewRefresh] = useState(0);
  const [views, setViews] = useState({});

  // fetch all products all views
  useEffect(() => {
    UserService.fetchViews()
      .then((e) => {
        // console.log(e);
        let viewObject = Object.fromEntries(
          e.data.map((item) => [item.product_id, item.viewed])
        );
        setViews(viewObject);
      })
      .catch((err) => console.log(err));
  }, [viewRefresh]);

  const [selectedProduct, setSelectedProduct] = useState(null); // save those are selected

  useEffect(() => {
    // fetch user vise views
    UserService.fetchUserview(user.userId)
      .then((e) => {
        // console.log(e);
        setViewedProducts(new Set(e.data.map((item) => item.product_id))); //store the this user view products
      })
      .catch((err) => console.log(err));

    //check product viewed or not if not then add view
    if (selectedProduct && !viewedProducts.has(selectedProduct.id)) {
      // console.log(selectedProduct);
      UserService.addView(user.userId, selectedProduct.id)
        .then((e) => {
          // console.log(e);
          setViewRefresh((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedProduct]);

  // Load category products when modal opens
  useEffect(() => {
    if (selectedProduct) {
      UserService.fetchProduct(selectedProduct.category_id)
        .then((res) => setCategoryProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [selectedProduct]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(searchProduct.length / productsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <h4 className="text-grey">
        Hello welcome Back{" "}
        <span className="fs-3 fw-bold text-danger">{user.userName}</span>
      </h4>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Browse Products</h3>

          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <i className="bi bi-person-circle fs-4"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>📦 Your Orders</Dropdown.Item>
              <Dropdown.Item onClick={()=> navigate("/wishList")}>❤️ Wishlist</Dropdown.Item>
              <Dropdown.Item onClick={()=>  navigate('/profile')}>👤 Profile</Dropdown.Item>
              <Dropdown.Item>⚙️ Settings</Dropdown.Item>
               <Dropdown.Item onClick={()=>{localStorage.clear(); return navigate("/login")}}
               > <FaSignOutAlt /> LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* Search Bar To Search Product Carts */}
        <div>
          <input
            type="text"
            name="search"
            placeholder=" Search here.."
            className="py-2 border-1 rounded-start w-75 ms-5 px-2 border-danger"
            onChange={(e) => {
              searchBar(e.target.value);
            }}
          />
        </div>
        {/* Cart Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-info fw-bold rounded-pill px-4"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <i className="bi bi-cart4"></i> Cart ({cartCount})
          </button>
        </div>

        {/* Categories */}
        <nav className="d-flex flex-wrap gap-2 mb-4">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setRefresh((r) => r + 1)}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="btn btn-outline-primary btn-sm"
              onClick={() => categoryHandler(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Product Grid */}
        <div className="row">
          {currentProducts.length === 0 ? (
            <p className="text-center text-muted">Loading products...</p>
          ) : (
            currentProducts.map((p) => (
              <div className="col-6 col-md-3 mb-4" key={p.id}>
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={`http://localhost:3000${p.image_url}`}
                    className="card-img-top rounded"
                    style={{ height: "160px", objectFit: "cover" }}
                    alt={p.name}
                    onClick={() => setSelectedProduct(p)}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-bold">{p.name}</h6>
                    <p className="text-success fw-bold mb-1">
                      ₹{p.discount_price}{" "}
                      <span className="text-muted text-decoration-line-through ms-1">
                        ₹{p.price}
                      </span>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => addToCart(p)}
                      >
                        <i className="bi bi-cart-plus"></i> Add
                      </button>
                      <button
                        className={`btn btn-sm ${
                          likes[p.id] ? "btn-danger" : "btn-outline-danger"
                        }`}
                        onClick={() => toggleLike(p.id)}
                      >
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={handlePrev}>
                  Previous
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">
                  Page {currentPage} of {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={handleNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "inline-block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="fw-bold">{selectedProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Left: Image + small info */}
                  <div className="col-md-5 text-center border-end">
                    <img
                      src={`http://localhost:3000${selectedProduct.image_url}`}
                      className="img-fluid mb-3 rounded"
                      alt={selectedProduct.name}
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                    <p className="text-muted">{selectedProduct.description}</p>
                  </div>

                  {/* Right: Full info */}
                  <div className="col-md-7">
                    <h4 className="fw-bold">{selectedProduct.name}</h4>
                    <h5 className="text-success fw-bold">
                      ₹{selectedProduct.discount_price}
                    </h5>
                    <h6 className="text-muted fw-bold text-decoration-line-through">
                      ₹{selectedProduct.price}
                    </h6>
                    <h6 className="text-primary fw-bold">
                      Save ₹
                      {selectedProduct.price - selectedProduct.discount_price}
                    </h6>
                    //todo Incomplete to show likes using key and values
                    <p className="text-secondary">
                      👁 Views: {views[selectedProduct.id] || 0} | ❤️ Likes:{" "}
                      {allLikes[selectedProduct.id]
                        ? allLikes[selectedProduct.id]
                        : 0}
                      {/* {console.log(likes)} //!
                      {console.log(selectedProduct.id)} */}
                    </p>
                    <button
                      className="btn btn-success btn-lg mt-3"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      <i className="bi bi-cart-plus"></i> Buy Now
                    </button>
                  </div>
                </div>

                {/* More products from same category */}
                <hr />
                <h6 className="fw-bold mb-3">
                  More in {selectedProduct.category_name}
                </h6>
                <div className="row">
                  {categoryProducts
                    .filter((p) => p.id !== selectedProduct.id)
                    .map((p) => (
                      <div className="col-6 col-md-3 mb-3" key={p.id}>
                        <div
                          className="card h-100 shadow-sm"
                          onClick={() => setSelectedProduct(p)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={`http://localhost:3000${p.image_url}`}
                            className="card-img-top rounded"
                            style={{ height: "150px", objectFit: "cover" }}
                            alt={p.name}
                          />
                          <div className="card-body text-center p-2">
                            <h6 className="fw-bold small mb-0">{p.name}</h6>
                            <small className="text-success fw-bold">
                              ₹{p.discount_price}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal (unchanged) */}
      {showCart && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="fw-bold">🛒 Your Cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCart(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Show Carts Data when click Carts */}
                {cartProduct.length === 0 ? (
                  <p className="text-center text-muted">Your cart is empty.</p>
                ) : (
                  <ul className="list-group">
                    {cartProduct.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={`http://localhost:3000${item.image_url}`}
                            alt={item.name}
                            style={{
                              width: "50px",
                              height: "52px",
                              objectFit: "cover",
                            }}
                            className="rounded me-3"
                          />
                          <div>
                            <h6 className="mb-0">{item.name}</h6>
                            <small className="text-success fw-bold">
                              ₹{item.discount_price}
                            </small>
                            <small className=" ms-2 text-muted">
                              ₹{item.price}
                            </small>
                          </div>
                        </div>
                        <span className="p-2 fs-6 badge bg-primary rounded-pill">
                          {item.quantity}
                        </span>
                        <div className="">
                          {/* Minus Icon */}
                          <button
                            className="border-0 fs-3 bg-white "
                            onClick={() => descreseQuantity(item.id)}
                          >
                            <i className="text-danger rounded-pill bi bi-dash-circle"></i>
                          </button>
                          {/* Plus Icon */}
                          <button
                            className=" border-0 fs-3 bg-white "
                            onClick={() => increseQuantity(item.id)}
                          >
                            <i className="text-success rounded-pill bi bi-plus-circle"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowCart(false)}
                >
                  Close
                </button>
                {cartProduct.length > 0 && (
                  <button className="btn btn-success">
                    <i className="bi bi-bag-check"></i> Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
