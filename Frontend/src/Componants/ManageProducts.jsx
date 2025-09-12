import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  Card,
  Row,
  Col,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaBox,
  FaTag,
  FaDollarSign,
  FaImage,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import AdminService from "../Service/AdminService";

const ProductManager = () => {
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    discount_price: "",
    category: "",
    image: null,
  });

  // Fetch products
  useEffect(() => {
    AdminService.viweProduct()
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleShow = () => {
    AdminService.showCategories()
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.log(err));
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditProduct(null);
    setFormData({
      id: "",
      name: "",
      description: "",
      price: "",
      discount_price: "",
      category: "",
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { name, description, price, category } = formData;
    if (!name || !description || !price || !category) {
      alert("Please fill all required fields!");
      return;
    }

    const finalProduct = editProduct
      ? { ...formData, id: editProduct.id }
      : { ...formData, id: 0 };

    const action = editProduct
      ? AdminService.updateProduct(finalProduct)
      : AdminService.saveProduct(finalProduct);

    action
      .then((result) => {
        setMsg(result.data);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => setMsg(err.data));

    setTimeout(() => setMsg(""), 5000);
    handleClose();
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    handleShow();
  };

  const handleDelete = (id) => {
    AdminService.deleteProduct(id)
      .then((result) => {
        setMsg(result.data);
        setTimeout(() => setMsg(""), 5000);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.categoryName &&
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-3">📦 Product Manager</h2>
      {msg && (
        <strong className="mb-2 mt-2 d-block bg-success text-center text-warning fs-5 rounded-pill mx-5">
          {msg}
        </strong>
      )}

      {/* Search Bar */}
     <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-4 gap-3">
  {/* Search Bar */}
  <InputGroup className="shadow-sm rounded-pill overflow-hidden w-50 w-md-50">
    <InputGroup.Text className="bg-white border-0">
      <FaSearch />
    </InputGroup.Text>
    <Form.Control
      type="text"
      placeholder="Search products by name, description, category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border-0 shadow-none"
    />
  </InputGroup>

  {/* Add Product Button */}
  <Button
    variant="success"
    onClick={handleShow}
    className="shadow px-4 rounded-pill d-flex align-items-center"
  >
    <FaPlusCircle className="me-2" /> Add Product
  </Button>
</div>


      {/* Add Product Button */}
      {/* <div className="d-flex justify-content-center mb-3">
        <Button
          variant="success"
          onClick={handleShow}
          className="shadow px-4 rounded-pill"
        >
          <FaPlusCircle className="me-2" /> Add Product
        </Button>
      </div> */}

      {/* Product Cards */}
      <Row className="mt-4">
        {filteredProducts.length === 0 && (
          <p className="text-center w-100 mt-3">No products found.</p>
        )}
        {filteredProducts.map((p) => (
          <Col md={4} sm={6} xs={12} key={p.id} className="mb-4">
            <Card className="shadow-lg glass-card h-100">
              <Card.Img
                variant="top"
                src={
                  p.image instanceof File
                    ? URL.createObjectURL(p.image)
                    : p.image || `http://localhost:3000${p.image_url}`
                }
                style={{
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{p.name}</Card.Title>
                <Card.Text>
                  <span className="text-muted">{p.description}</span>
                  <br />
                  <strong>💰 Price:</strong> ₹{p.price}
                  <br />
                  <strong>🏷 Discount:</strong>{" "}
                  {p.discount_price ? `₹${p.discount_price}` : "-"}
                  <br />
                  <strong>📂 Category:</strong> {p.categoryName}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                  <Button
                    variant="outline-warning"
                    onClick={() => handleEdit(p)}
                    className="rounded-circle"
                  >
                    <FaEdit />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(p.id)}
                    className="rounded-circle"
                  >
                    <FaTrash />
                  </Button>
                </OverlayTrigger>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {editProduct ? "✏️ Edit Product" : "➕ Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaBox />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  minLength={1}
                  maxLength={50}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
                minLength={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaDollarSign />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  min={0}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaTag />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleChange}
                  placeholder="Enter discount price"
                  min={0}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categoryData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaImage />
                </InputGroup.Text>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!editProduct}
                />
              </InputGroup>
              {formData.image && (
                <p className="mt-2 text-success">📁 {formData.image.name}</p>
              )}
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
              Save Product
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>{`
        .glass-card {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0px 8px 25px rgba(0,0,0,0.15);
        }
        .rounded-circle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default ProductManager;
