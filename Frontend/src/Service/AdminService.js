import axios from "axios";
// import App from "../App";

const API_URL = "http://localhost:3000/admin";

const AdminService = {
  CheckAdmin: (data) => {
    return axios.post(`${API_URL}/login`, data);
  },
  // Categories Api 
  saveCategory: (data) => {
    return axios.post(`${API_URL}/addCategory`, data);
  },
  showCategories: () => {
    return axios.get(`${API_URL}/viewCategory`);
  },
  updateCategory: (name, id) => {
    return axios.put(`${API_URL}/updateCategory`, { id: id, name: name });
  },
  deleteCategory: (id) => {
    return axios.delete(`${API_URL}/deleteCategory/${id}`);
  },

  // Product Api 
  saveProduct: (data) => {
    return axios.post(`${API_URL}/addProduct`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  viweProduct: () => {
    return axios.get(`${API_URL}/viewProduct`);
  },
  updateProduct: (data) => {
    return axios.post(`${API_URL}/updateProduct`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  deleteProduct: (id) => {
    return axios.delete(`${API_URL}/deleteProd/${id}`)
  },

}

export default AdminService; 
