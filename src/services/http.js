import axios from "axios";

export const http = axios.create({
  baseURL: "https://fam-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
