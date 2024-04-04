import axios from "axios";
import { baseURL } from "../baseURL/baseURL";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
