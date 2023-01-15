import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hciblog.online/",
  headers: {
    "Content-Type": "application/json",
    "With-Credentials": true,
  },
});

export default api;
