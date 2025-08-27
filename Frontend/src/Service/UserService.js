import axios from "axios";
import App from "../App";

const API_URL = "http://localhost:3000";

const UserService = {
  
  viewUsers:()=>{
    return axios.get(`${API_URL}/getUsers`)
  },
  checkUser: (data) => {
    return axios.post(`${API_URL}/login`, data);
  },
  registerUser:(data)=>{
      return axios.post(`${API_URL}/register`,data);
  },
  fetchProduct:(id)=>{
    return axios.get(`${API_URL}/showProducts/${id}`);
  },
  addInCart:(userId,productId)=>{
    return axios.post(`${API_URL}/addProductInCart`,{productId:productId,userId:userId});
  },
  getCartData:(userId)=>{
    return axios.get(`${API_URL}/getCarts/${userId}`);
  },
  quantity:(id,msg)=>{
    return axios.get(`${API_URL}/quantity/${id}/${msg}`);
  },
};

export default UserService;
