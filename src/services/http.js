import axios from "axios";

export const http = axios.create({
  // baseURL: "https://fam-api-production.up.railway.app",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
