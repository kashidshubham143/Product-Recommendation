import React, { useState, useEffect } from "react";
import AdminService from "../Service/AdminService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]); // backend products
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    AdminService.viweProduct()
      .then((result) => {
        // console.log(result.data);
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container py-4">
      {/* Page Title */}
      <h3 className="mb-4 text-center fw-bold">Browse Products</h3>

      {/* Product Grid */}
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : (
          products.map((p) => (
            <div className="col-6 col-md-auto mb-4 " key={p.id}>
              <div
                className="card shadow-sm h-100 ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedProduct(p)}
              >
                <img
                  src={`http://localhost:3000${p.image_url}`}
                  className="card-img-top"
                  style={{ height: "180px",width:"200px", objectFit: "cover" }}
                  alt={p.title}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="text-success fw-bold">Save ₹{p.discount_price}</p>
                  <strong className="text-muted w-25">{p.description}</strong>
                  <strong className="text-success">{p.discount_price}</strong>
                  <strong className="d-block">₹{p.price}</strong>
                  <strong className="text-success">Save ₹{p.discount_price}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{selectedProduct.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={`http://localhost:3000${selectedProduct.image_url}`}
                  className="img-fluid mb-3 rounded"
                  alt={selectedProduct.title}
                />
                <h6 className="text-success fw-bold">₹{selectedProduct.price}</h6>
                <p className="text-muted">
                  Delicious & fresh product just for you.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
                <button className="btn btn-success">
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
