import axios from "axios";

const api = axios.create({
  baseURL: "https://kind-rejoicing-production-4dc9.up.railway.app"
});

export default api;
