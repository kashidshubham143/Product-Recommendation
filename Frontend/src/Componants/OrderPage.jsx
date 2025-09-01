import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const OrderPage = () => {
  // Dummy orders (later fetch from API)
  const [orders] = useState([
    {
      id: "ORD12345",
      date: "2025-08-20",
      status: "Delivered",
      total: "₹1,250",
      items: ["Laptop Bag", "Wireless Mouse"],
    },
    {
      id: "ORD12346",
      date: "2025-08-22",
      status: "Processing",
      total: "₹2,499",
      items: ["Smart Watch"],
    },
    {
      id: "ORD12347",
      date: "2025-08-25",
      status: "Shipped",
      total: "₹799",
      items: ["Bluetooth Earphones", "USB Cable"],
    },
  ]);

  return (
    <div className="container py-4">
      <h3 className="mb-4">
        <i className="bi bi-box-seam me-2"></i> My Orders
      </h3>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle me-2"></i> No orders found.
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order, index) => (
            <div key={index} className="col-md-6">
              <div className="card border-0 shadow rounded-4 p-3 h-100">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">
                    <i className="bi bi-receipt-cutoff me-2"></i> {order.id}
                  </h5>
                  <span
                    className={`badge px-3 py-2 ${
                      order.status === "Delivered"
                        ? "bg-success"
                        : order.status === "Shipped"
                        ? "bg-primary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <hr />
                <p className="mb-1">
                  <i className="bi bi-calendar-event me-2"></i>{" "}
                  <strong>Date:</strong> {order.date}
                </p>
                <p className="mb-1">
                  <i className="bi bi-cart-check me-2"></i>{" "}
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
                <p className="mb-1">
                  <i className="bi bi-currency-rupee me-2"></i>{" "}
                  <strong>Total:</strong> {order.total}
                </p>
                <div className="text-end mt-3">
                  <button className="btn btn-outline-primary btn-sm me-2">
                    <i className="bi bi-eye me-1"></i> View Details
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    <i className="bi bi-arrow-repeat me-1"></i> Return
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
