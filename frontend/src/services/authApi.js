import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true
});

// // 🔹 Add token to headers automatically for every request
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// Auth Routes
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const googleLogin = (token) => API.post("/auth/google", { token });
export const logoutUser = () => API.post("/auth/logout"); 
export const fetchCurrentUser = () => API.get("/auth/me"); 

// User Routes
export const updateUserProfile = (data) => API.patch("/user/profile", data);