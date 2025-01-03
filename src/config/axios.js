import axios from "axios";
import Qs from "qs";

const { REACT_APP_BASE_URL, REACT_APP_PROXY } = process.env;

const BASE_URL = `${REACT_APP_BASE_URL}${REACT_APP_PROXY}`;

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
  validateStatus: () => true,
  withCredentials: true,
});

export default instance;
