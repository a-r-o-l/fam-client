import axios from "axios";

export const http = axios.create({
  baseURL: "fam-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
