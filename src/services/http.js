import axios from "axios";
import { useAccountStore } from "../store/useAccountStore";

// const apiUrl = import.meta.env.VITE_API_URL;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;

export const http = axios.create({
  baseURL: apiUrl,
  // baseURL: localApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh-token");
      if (refreshToken) {
        try {
          const response = await http.post("/refreshtoken", {
            refreshToken,
          });
          if (response.status === 200) {
            const { accessToken } = response.data;
            localStorage.setItem("access-token", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return http(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          useAccountStore.setCloseSession();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
