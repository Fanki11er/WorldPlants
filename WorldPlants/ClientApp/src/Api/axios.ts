import axios from "axios";
import { apiEndpoints } from "./endpoints";

const { baseURL } = apiEndpoints;

export default axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
