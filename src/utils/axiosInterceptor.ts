import axios from "axios";
import { BASE_URL } from "../constants";
const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
export default api;
