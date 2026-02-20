import axios from "axios";

// Use environment variable instead of localhost
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  checkAuth: () => api.get("/auth/check"),
};

// Balance APIs
export const balanceAPI = {
  checkBalance: () => api.get("/balance/check"),
};

export default api;