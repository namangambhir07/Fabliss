import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getOrders = () => API.get("/admin/orders");

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, { status });