import axios from "axios";

// Create an axios instance with the base URL pointing to your backend server
const api = axios.create({
  baseURL: "http://localhost:8081", // Ensure this matches your backend's running URL and port
  headers: {
    "Content-Type": "application/json", // Default content type for API requests
  },
});

export default api;
