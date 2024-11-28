import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000", // URL base para suas requisições
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
