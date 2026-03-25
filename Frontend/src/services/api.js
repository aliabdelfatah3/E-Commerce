import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if the 401 didn't come from the login attempt itself
    if (error.response?.status === 401 && !error.config.url.includes("/login")) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post("/login", credentials),
  register: (userData) => api.post("/register", userData),
  logout: () => api.post("/logout"),
  getUser: () => api.get("/user"),
  forgotPassword: (data) => api.post("/forgot-password", data),
  resetPassword: (data) => api.post("/reset-password", data),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (productId, quantity, size) =>
    api.post("/cart", { product_id: productId, quantity, size: size || "" }),
  updateCartItem: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete("/cart"),
};

// Order APIs
export const orderAPI = {
  getOrders: () => api.get("/orders"),
  createOrder: (orderData) => api.post("/orders", orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
};

export default api;
