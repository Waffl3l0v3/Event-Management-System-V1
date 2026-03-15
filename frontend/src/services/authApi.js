import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
  withCredentials: true
});

export const loginUser = (data) =>
  API.post("/login", data);

export const registerUser = (data) =>
  API.post("/register", data);

export const googleLogin = (token) =>
    API.post("/google", { token });

