import axios from "axios";

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
};

export default UserService;
