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
  showLike:(userId)=>{
    return axios.get(`${API_URL}/showLikes/${userId}`);
  },
  managelike:(userId,productId,msg)=>{ // Manage Likes
      return axios.post(`${API_URL}/managelike`,{userId:userId,productId:productId,msg:msg});
  },
  fetchAllLikes:()=>{
    return axios.get(`${API_URL}/fetchLikes`)
  },
  addView:(userId,productId)=>{
    return axios.post(`${API_URL}/addView`,{userId:userId,productId:productId});
  },
  fetchViews:()=>{
    return axios.get(`${API_URL}/fetchViews`);
  },
  fetchUserview:(userId)=>{
    return axios.get(`${API_URL}/fetchUserview/${userId}`);
  },
  getProfile:(token)=>{ //Authenticate JWT Token
    return axios.get(`${API_URL}/getProfile`,{headers:{Authorization:`Bearer ${token}`}});

  },
  wishList:(userId)=>{
    return axios.get(`${API_URL}/wishList/${userId}`)


  }
};

export default UserService;
