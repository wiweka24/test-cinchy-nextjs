import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cinchy-coding-test-api.onrender.com/api",
  // withCredentials: true,
});