import axios from "axios";

// // 🔹 Add token to headers automatically for every request
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// Auth Routes

const API_auth = axios.create({
  baseURL: "/api/auth",
  withCredentials: true
});

export const loginUser = (data) => API_auth.post("/login", data);
export const registerUser = (data) => API_auth.post("/register", data);
export const googleLogin = (token) => API_auth.post("/google", { token });
export const logoutUser = () => API_auth.get("/logout"); 
export const fetchCurrentUser = () => API_auth.get("/me"); 

// User Routes
const API_user = axios.create({
  baseURL: "/api/user",
  withCredentials: true
});

export const updateUserProfile = (data) => API_user.patch("/profile", data);
export const getUserProfile = () => API_user.get("/profile");