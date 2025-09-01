import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProfilePage = () => {
  // Dummy user data (replace with API data later)
  const [user, setUser] = useState({
    name: "Shubham Kashid",
    email: "shubham@example.com",
    phone: "+91 98765 43210",
    city: "Pune",
    address: "Flat 202, Sunrise Apartments, Kothrud",
    avatar:
      "https://ui-avatars.com/api/?name=Shubham+Kashid&background=0D6EFD&color=fff&size=200",
    joined: "March 2024",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle profile edit input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile updates
  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData); // update user data
    setIsEditing(false);
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Save new password
  const handlePasswordSave = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("❌ New password & confirm password do not match!");
      return;
    }

    // Call backend API here to change password
    console.log("Password Updated:", passwordData);

    alert("✅ Password changed successfully!");
    setShowPasswordModal(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Left Profile Card */}
        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4 text-center p-4">
            <img
              src={user.avatar}
              alt="Profile"
              className="rounded-circle border border-3 border-primary mx-auto mb-3"
              width="150"
              height="150"
            />
            <h4 className="fw-bold">{user.name}</h4>
            <p className="text-muted">{user.email}</p>
            <p>
              <i className="bi bi-calendar-event me-2"></i> Joined {user.joined}
            </p>

            {!isEditing ? (
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil-square me-2"></i> Edit Profile
              </button>
            ) : (
              <button
                className="btn btn-secondary w-100 mt-3"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </div>

        {/* Right Details */}
        <div className="col-md-8">
          <div className="card border-0 shadow rounded-4 p-4">
            <h5 className="mb-3">
              <i className="bi bi-person-lines-fill me-2"></i> Profile Details
            </h5>
            <hr />

            {!isEditing ? (
              // -------- View Mode --------
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold">Full Name</label>
                  <p className="form-control bg-light">{user.name}</p>
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Email</label>
                  <p className="form-control bg-light">{user.email}</p>
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Phone</label>
                  <p className="form-control bg-light">{user.phone}</p>
                </div>
                
                <div className="col-6">
                  <label className="fw-semibold">Address</label>
                  <p className="form-control bg-light">{user.address}</p>
                </div>
              </div>
            ) : (
              // -------- Edit Mode --------
              <form onSubmit={handleSave} className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="fw-semibold">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-success">
                    💾 Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Extra Section */}
          <div className="card border-0 shadow rounded-4 p-4 mt-4">
            <h5 className="mb-3">
              <i className="bi bi-shield-lock me-2"></i> Security
            </h5>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowPasswordModal(true)}
            >
              <i className="bi bi-lock me-2"></i> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-lock me-2"></i> Change Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>
              <form onSubmit={handlePasswordSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="fw-semibold">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fw-semibold">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fw-semibold">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    💾 Save Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
