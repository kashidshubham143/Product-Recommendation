import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PaymentPage = () => {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();   // ✅ initialize navigate

  const handlePayment = (e) => {
    e.preventDefault();
    alert("✅ Payment successful!");
    navigate("/dashboard"); // redirect after success
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel the payment?")) {
      alert("❌ Payment cancelled.");
      navigate("/userdashboard");   // ✅ now it will redirect
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 rounded-4 p-4">
            <h4 className="mb-3 text-center">
              <i className="bi bi-credit-card me-2"></i> Payment
            </h4>
            <hr />

            {/* Payment Method Selection */}
            <div className="mb-3">
              <label className="fw-semibold mb-2">Select Payment Method</label>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="card">💳 Credit/Debit Card</option>
                <option value="upi">📱 UPI</option>
                <option value="netbanking">🏦 Net Banking</option>
                <option value="cod">🚚 Cash on Delivery</option>
              </select>
            </div>

            {/* Card Payment Form */}
            {method === "card" && (
              <div>
                <input className="form-control my-2" placeholder="Card Number" />
                <div className="row">
                  <div className="col">
                    <input className="form-control my-2" placeholder="MM/YY" />
                  </div>
                  <div className="col">
                    <input className="form-control my-2" placeholder="CVV" />
                  </div>
                </div>
                <input
                  className="form-control my-2"
                  placeholder="Card Holder Name"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={handleCancel}
                className="btn btn-outline-danger w-50 me-2"
              >
                <i className="bi bi-x-circle me-2"></i> Cancel
              </button>
              <button
                onClick={handlePayment}
                className="btn btn-success w-50 ms-2"
              >
                <i className="bi bi-check2-circle me-2"></i> Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
