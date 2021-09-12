import axios from "axios";
import { api } from "./urlConfig";

const token = window.localStorage.getItem("token");
console.log(token, "axios");
// create Intance of axios
const axiosInc = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `${token}` : "",
  },
});

export default axiosInc;
