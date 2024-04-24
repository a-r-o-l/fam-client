import axios from "axios";

export const http = axios.create({
  baseURL: "https://fam-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
