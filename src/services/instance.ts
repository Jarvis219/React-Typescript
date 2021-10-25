import axios from "axios";
import { api } from "../contants/api";
const instance = axios.create({
  baseURL: api,
  headers: {
    "content-type": "application/json",
  },
});
export default instance;
