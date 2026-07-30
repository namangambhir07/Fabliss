import axios from "axios";

// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In production, set VITE_API_URL to your deployed backend URL.
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});
// Attach the saved login token, if any, to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fabliss_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
