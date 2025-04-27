import axios from "axios";
import * as https from "https";
import { toast } from "react-toastify";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Bir hata oluştu";

    if (error?.response?.status !== 401 && error?.response?.status !== 403) {
      toast(message, {
        position: "top-right",
      });
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
