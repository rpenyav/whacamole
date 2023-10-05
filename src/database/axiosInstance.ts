import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL || "https://whac-backend.onrender.com";

export const axiosInstance = axios.create({
  baseURL,
});
