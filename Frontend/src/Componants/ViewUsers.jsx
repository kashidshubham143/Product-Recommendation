import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";
import UpdateUser from "./UpdateUser";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.viewUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      await UserService.registerUser(newUser);
      fetchUsers();
      setShow(false);
      setNewUser({ name: "", email: "", password: "", contact: "", address: "" });
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  // 🔍 Filter users by name/email
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div
          className="card-header text-white text-center fw-bold fs-4 d-flex justify-content-between align-items-center"
          style={{ background: "linear-gradient(90deg,#007bff,#00c6ff)" }}
        >
          👥 Users Management
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="🔍 Search users..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="success" onClick={() => setShow(true)}>
              ➕ Add User
            </Button>
          </div>
        </div>

        <div className="card-body table-responsive" style={{ maxHeight: "70vh" }}>
          <table className="table table-hover table-striped align-middle text-center table-bordered">
            <thead className="table-primary sticky-top" style={{ zIndex: 1 }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-bold text-primary">#{user.id}</td>
                    <td>{user.name}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span className="badge bg-secondary">••••••</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{user.contact}</span>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      {user.address}
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {new Date(user.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        title="Update User"
                        onClick={() => setSelectedUser(user)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete User"
                        onClick={() => handleDelete(user.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-danger fw-bold">
                    🚫 No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Update User Modal */}
      {selectedUser && (
        <UpdateUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={fetchUsers}
        />
      )}

      {/* ✅ Add User Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>➕ Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={newUser.contact}
                onChange={(e) =>
                  setNewUser({ ...newUser, contact: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newUser.address}
                onChange={(e) =>
                  setNewUser({ ...newUser, address: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewUsers;
