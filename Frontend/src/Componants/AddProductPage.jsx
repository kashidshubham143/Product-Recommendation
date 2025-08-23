import React, { useState } from "react";
import AdminService from '../Service/AdminService';
// import axios from "axios";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    image: "",
    category: "",
  });

  const categories = ["Fruits", "Vegetables", "Dairy", "Snacks", "Beverages"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//     console.log(formData);
      AdminService.saveProduct(formData).then((result)=>{
            
      }).catch((err)=>{

      });
//     try {
//       const res = await axios.post("http://localhost:3000/admin/addProduct", formData);
//       alert("Product added successfully!");
//       console.log(res.data);
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         discount_price: "",
//         image: "",
//         category: "",
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Error adding product");
//     }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                className="form-control"
                value={formData.discount_price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
